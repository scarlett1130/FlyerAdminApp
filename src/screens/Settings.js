import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import * as Yup from "yup";
import { useDispatch, getState } from "react-redux";

import { registerDevice } from "../redux/actions/registerDevice";
import { Screen } from "../components/Screen";
import { ModalCard } from "../components/ModalCard";
import AppForm from "../components/loginForm/Form";
import AppFormField from "../components/loginForm/FormField";
import SubmitButton from "../components/loginForm/SubmitButton";
import colors from "../constants/colors";
import ListItem from "../components/ListItem";
import SeparatorLine from "../components/SeparatorLine";
import Button from "../components/Button";
import { logout } from "../redux/actions/login";
import { updatePassword } from "../components/updatePassword";
import store from "../redux/store";

const validationPasswordChange = Yup.object().shape({
  oldPassword: Yup.string().required().min(4).label("Old password"),
  newPassword: Yup.string().required().min(4).label("New password"),
  repeatPassword: Yup.string()
    .required()
    .min(4)
    .label("Repeated password")
    .when("newPassword", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Repeated passsword must be the same as new password"
      ),
    }),
});

export default function Settings(props) {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const dispatch = useDispatch();
  const state = store.getState();
  const username = state.user.userId;

  const onChangePasswordPress = () => {
    setShowChangePassword(!showChangePassword);
  };
  const onChangePasswordSubmit = ({
    oldPassword,
    newPassword,
    repeatPassword,
  }) => {
    updatePassword({
      password_old: oldPassword,
      password_confirm: repeatPassword,
      password: newPassword,
    });
  };
  const onOrganizationsClick = () => {
    props.navigation.navigate("Organizations");
  };
  const onLogout = () => {
    dispatch(logout());
    // delete device token
    dispatch(registerDevice(""));
  };

  return (
    <Screen style={styles.mainContainer} loading={false}>
      <ModalCard
        title="Change Password"
        visible={showChangePassword}
        onPressClose={onChangePasswordPress}
      >
        <AppForm
          initialValues={{
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
          }}
          onSubmit={onChangePasswordSubmit}
          validationSchema={validationPasswordChange}
        >
          <Text style={styles.modalSectionTitle}>Old Password</Text>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="oldPassword"
            placeholder="Enter"
            secureTextEntry
            textContentType="password"
          />
          <Text style={styles.modalSectionTitle}>New Password</Text>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="newPassword"
            placeholder="Enter"
            secureTextEntry
            textContentType="password"
          />
          <Text style={styles.modalSectionTitle}>Repeat Password</Text>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            name="repeatPassword"
            placeholder="Enter"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Change Password" width="60%" />
        </AppForm>
      </ModalCard>
      <View style={styles.listContainer}>
        <ListItem title="Email" subtitle={username}></ListItem>
        <SeparatorLine />
        <TouchableOpacity onPress={onChangePasswordPress}>
          <ListItem
            title="Change Password"
            IconComponent="chevron-right"
            textColor={colors.primary}
          ></ListItem>
        </TouchableOpacity>
        <SeparatorLine />
        <TouchableOpacity onPress={onOrganizationsClick}>
          <ListItem
            title="My Organizations"
            IconComponent="chevron-right"
            textColor={colors.primary}
          ></ListItem>
        </TouchableOpacity>
      </View>
      <View style={styles.logoutButton}>
        <Button title="Log Out" width="100%" height={40} onPress={onLogout} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  logoutButton: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.9,
    height: 60,
  },
  listContainer: {
    width: "90%",
    height: 150,
    marginTop: 16,
    marginBottom: 5,
    paddingVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  modalSectionTitle: {
    height: 23,
    color: colors.textPrimary,
    fontFamily: "Lato-Regular",
    fontSize: 16,
    letterSpacing: 0,
    marginTop: 5,
  },
});
