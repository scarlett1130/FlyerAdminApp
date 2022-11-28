import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Linking,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Screen } from "../components/Screen";
import { ModalCard } from "../components/ModalCard";
import AppForm from "../components/loginForm/Form";
import AppFormField from "../components/loginForm/FormField";
import SubmitButton from "../components/loginForm/SubmitButton";
import colors from "../constants/colors";
import { registerDevice } from "../redux/actions/registerDevice";
import { fetchUserData, login } from "../redux/actions/login";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
const validationContact = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  organization: Yup.string().required().label("Organization"),
  message: Yup.string().required().label("Message"),
});

function Login(props) {
  const [showContactForm, setShowContactForm] = useState(false);
  const loading = useSelector((state) => state.application.loading);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(fetchUserData());
      // send device token
      dispatch(registerDevice(props.expoPushToken));
      setTimeout(() => {
        props.navigation.replace("HomeScreen");
      }, 1000);
    }
  }, [isUserLoggedIn]);

  const handleSubmit = ({ username, password }) =>
    dispatch(login({ username, password }));

  const onForgotPasswordPress = () => {
    Linking.openURL(
      "https://my.flyerschoolapp.com/my-users/request-reset-password"
    );
  };
  const onContactPress = () => {
    setShowContactForm((showContactForm) => !showContactForm);
  };
  const onContactSendPress = ({ name, email, organization, message }) => {
    const newLine = "%0D%0A";
    const body =
      message +
      newLine +
      newLine +
      name +
      newLine +
      organization +
      newLine +
      email;
    Linking.openURL(
      `mailto:support@flyerconnect.org?subject=Flyer App Inquiry&body=${body}`
    );
  };

  return (
    <ScrollView style={styles.wrap}>
      <Image
        style={styles.loginBanner}
        source={require("../../assets/images/image-login.png")}
        resizeMode="contain"
      />
      <Screen style={styles.container} loading={loading}>
        <ModalCard
          title="Contact Us"
          visible={showContactForm}
          onPressClose={onContactPress}
        >
          <AppForm
            initialValues={{
              name: "",
              email: "",
              organization: "",
              message: "",
            }}
            onSubmit={onContactSendPress}
            validationSchema={validationContact}
          >
            <Text style={styles.modalSectionTitle}>Your Name</Text>
            <AppFormField
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType="default"
              name="name"
              placeholder=""
              textContentType="name"
            />
            <Text style={styles.modalSectionTitle}>Your Email</Text>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              textContentType="emailAddress"
            />
            <Text style={styles.modalSectionTitle}>Your Organization</Text>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              name="organization"
              textContentType="none"
            />
            <Text style={styles.modalSectionTitle}>Message</Text>
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              name="message"
              textContentType="none"
              multiline={true}
              numberOfLines={5}
              height={125}
              textAlignVertical="top"
            />
            <SubmitButton title="Send" width="50%" />
          </AppForm>
        </ModalCard>

        <View style={styles.labelContainer}>
          <Text style={styles.logInLabel}>Log In</Text>
        </View>
        <AppForm
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="username"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <TouchableOpacity onPress={onForgotPasswordPress}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <SubmitButton title="Log in" />
        </AppForm>
        <View style={styles.sectionSeparator}></View>
        {/*  <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>OR</Text>
          <View style={styles.separatorLine} />
        
        <TouchableOpacity style={styles.cleverBtnContainer}>
          {
            <Image
              source={require("../../assets/images/clever.png")}
              style={styles.cleverImage}
            />
          }
        </TouchableOpacity> */}
        <View style={styles.contactUsSection}>
          <Text>Don’t have an account? </Text>
          <Text style={styles.contactUs} onPress={onContactPress}>
            Contact us.
          </Text>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15, flex: 1 },
  wrap: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.white,
  },
  forgotPassword: {
    color: colors.hyperlink,
    fontSize: 16,
    lineHeight: 19,
    marginTop: 15,
    marginBottom: 10,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  loginBanner: {
    width: Dimensions.get("window").width + 5,
    height: ((Dimensions.get("window").width + 5) / 752) * 618,
  },
  labelContainer: {
    marginBottom: 10,
  },
  logInLabel: {
    fontFamily: "Lato-Regular",
    color: colors.label,
    fontSize: 20,
    lineHeight: 24,
    alignSelf: "center",
  },
  sectionSeparator: {
    marginTop: 15,
    flexDirection: "row",
  },
  separatorText: {
    alignSelf: "center",
    paddingHorizontal: 5,
    fontSize: 16,
    color: colors.placeholderText,
  },
  separatorLine: {
    backgroundColor: colors.gray,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  cleverBtnContainer: {
    paddingTop: 15,
    marginBottom: 50,
    marginTop: 10,
  },
  cleverImage: {
    width: 207,
    height: 46,
    alignSelf: "center",
    resizeMode: "contain",
  },
  contactUsSection: {
    flexDirection: "row",
    height: 19,
    width: 375,
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 19,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Lato-Regular",
    marginBottom: 10,
    alignSelf: "center",
  },
  contactUs: {
    color: colors.hyperlink,
    textDecorationLine: "underline",
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

export default Login;
