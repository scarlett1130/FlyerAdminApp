import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../constants/colors";

export default function RoundAddButton({ onClick }) {
  return (
    <TouchableOpacity style={styles.roundButton} onPress={onClick}>
      <Icon name="add" type="material" size={35} color={colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: colors.primary,
    borderRadius: 50,
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});
