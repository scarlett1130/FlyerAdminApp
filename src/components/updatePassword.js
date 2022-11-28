import { UpdatePasswordUrl } from "../constants/api";
import { Alert } from "react-native";
import { isExpired } from "../common/expiration";
import { logout } from "../redux/actions/login";
import { endLoading, startLoading } from "../redux/actions/application";

export const updatePassword = (passwordInput) => {
  let formBody = [];
  for (let property in passwordInput) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(passwordInput[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return (dispatch, getState) => {
    const state = getState();
    const token = state.user.data.access_token;

    if (isExpired(state.user.data.expires_in)) {
      return dispatch(logout());
    }

    dispatch(startLoading());
    return fetch(UpdatePasswordUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((json) => {
        if (
          json.meta &&
          json.meta.msg &&
          json.meta.msg === "Password has been changed successfully"
        ) {
          // provjeri da li backend log out napravi???

          Alert.alert(
            "Update Password was successful",
            "Continue using new password"
          );
        } else {
          Alert.alert("Update Password Failed", "Input data is incorrect");
        }
      })
      .catch((err) => {
        Alert.alert(
          "Update Password Failed",
          "Some error occurred, please retry"
        );
        console.log(err);
      })
      .finally(() => dispatch(endLoading()));
  };
};
