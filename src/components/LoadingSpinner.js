import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import colors from "../constants/colors";

export const LoadingSpinner = ({ visible }) => {
  return visible ? (
    <View style={styles.container}>
      <ActivityIndicator
        style={styles.spinner}
        color={colors.primary}
        size="large"
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    zIndex: 200,
  },
});
