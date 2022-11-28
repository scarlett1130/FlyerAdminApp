import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";
import { LoadingSpinner } from "./LoadingSpinner";

export const Screen = ({ loading, children, style, ...otherProps }) => {
  return (
    <View style={[{ flex: 1 }, style]} {...otherProps}>
      <LoadingSpinner visible={loading} />
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: Dimensions.get("window").width,
  },
});
