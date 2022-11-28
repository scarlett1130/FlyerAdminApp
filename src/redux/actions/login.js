import { AsyncStorage } from "react-native";

import { UserUrl, LoginUrl } from "../../constants/api";
import { Alert } from "react-native";
import * as RootNavigation from "../../common/RootNavigation";
import { isExpired } from "../../common/expiration";
import { endLoading, startLoading } from "./application";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_USER_DATA = "GET_USER_DATA";
export const SET_USER_ID = "SET_USER_ID";

export const setUserId = (id) => {
  return {
    type: SET_USER_ID,
    payload: id,
  };
};

export const userLogin = (loginData) => {
  return {
    type: USER_LOGIN,
    payload: loginData,
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
    payload: {},
  };
};

export const getUserData = (data) => {
  return {
    type: GET_USER_DATA,
    payload: data,
  };
};

const setLoginLocal = async (loginData) => {
  try {
    await AsyncStorage.setItem("loginData", JSON.stringify(loginData));
  } catch (error) {
    console.log(error);
  }
};

const deleteLoginLocal = async () => {
  try {
    await AsyncStorage.removeItem("loginData");
  } catch (error) {
    console.log(error);
  }
};

const setUserIdLocal = async (userId) => {
  try {
    await AsyncStorage.setItem("userId", JSON.stringify(userId));
  } catch (error) {
    console.log(error);
  }
};

const deleteUserIdLocal = async () => {
  try {
    await AsyncStorage.removeItem("userId");
  } catch (error) {
    console.log(error);
  }
};

export const login = (loginInput) => {
  const { username, password } = loginInput;

  let formBody = [];
  for (let property in loginInput) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(loginInput[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return (dispatch) => {
    dispatch(startLoading());
    return fetch(LoginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.meta && json.meta.msg && json.meta.code === 1) {
          const data = { ...json, userId: username };
          setLoginLocal(data);
          dispatch(userLogin(data));
        } else {
          Alert.alert("Login Failed", "Username or Password is incorrect");
        }
      })
      .catch((err) => {
        Alert.alert("Login Failed", "Some error occurred, please retry");
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };
};

export const logout = () => {
  return (dispatch) => {
    deleteLoginLocal();
    deleteUserIdLocal();
    dispatch(userLogout());
    RootNavigation.navigate("LoginScreen");
  };
};

export const fetchUserData = () => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    let url = UserUrl;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(startLoading());
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setUserIdLocal(json.data.id);
        dispatch(getUserData(json));
      })
      .catch((error) => {
        console.log("error user data:", error);
      })
      .finally(() => dispatch(endLoading()));
  };
};
