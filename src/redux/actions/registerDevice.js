import { RegisterUrl } from "../../constants/api";
import { Alert } from "react-native";
import { endLoading, startLoading } from "./application";

export const registerDevice = (device_token) => {
  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;
    let url = RegisterUrl + device_token;
    console.log("reg: ", url);

    if (!token) return;

    dispatch(startLoading());
    return fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.meta && json.meta.code && json.meta.code === 1) {
        } else {
          console.log("Device registration failed", json.meta.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };
};
