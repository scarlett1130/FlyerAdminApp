import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../constants/colors";

function AppButton({
  title,
  onPress,
  color = "primary",
  width = "70%",
  height = 50,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color], width, height }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "center",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
});

export default AppButton;
