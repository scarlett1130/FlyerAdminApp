import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../constants/styles";

function AppTextInput({ icon, width = "100%", height = 50, ...otherProps }) {
  return (
    <View
      style={[styles.container, { width }, { height, alignItems: "center" }]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={defaultStyles.colors.placeholderText}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={defaultStyles.colors.placeholderText}
        style={[
          defaultStyles.text,
          { flex: 1, paddingVertical: 20, height: 80 },
        ]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.textInputBg,
    borderRadius: 5,
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 5,
    justifyContent: "flex-start",
  },
  icon: {
    marginRight: 10,
    alignSelf: "center",
  },
});

export default AppTextInput;
