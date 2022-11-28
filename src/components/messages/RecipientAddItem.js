import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Chevron } from "react-native-shapes";

import colors from "../../constants/colors";
import SeparatorLine from "../SeparatorLine";

export default function RecipientAddItem({ title, onPress, separator = true }) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.addContactsRow}>
          <Text style={styles.addContactsText}>{title}</Text>
          <Chevron
            rotate={270}
            size={1.5}
            color={colors.placeholderText}
            style={styles.iconStyle}
          />
        </View>
      </TouchableOpacity>
      {separator && <SeparatorLine />}
    </View>
  );
}

const styles = StyleSheet.create({
  addContactsRow: {
    flexDirection: "row",
    height: 46,
    width: "100%",
    // alignSelf: '',
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  addContactsText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: "#62C3D0",
    alignSelf: "center",
  },
  iconStyle: {
    alignSelf: "center",
    top: 3,
  },
});
