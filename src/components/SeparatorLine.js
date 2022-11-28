import React from "react";
import { StyleSheet, View } from "react-native";
import colors from "../constants/colors";

export default function SeparatorLine(props) {
  return (
    <View style={styles.sectionSeparatorSm}>
      <View style={styles.separatorLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionSeparatorSm: {
    flexDirection: "row",
    paddingHorizontal: "4%",
  },
  separatorLine: {
    backgroundColor: colors.gray,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
});
