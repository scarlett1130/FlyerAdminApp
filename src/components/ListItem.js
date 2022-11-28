import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "./Text";
import colors from "../constants/colors";

function ListItem({
  title,
  subtitle,
  IconComponent,
  textColor = colors.textPrimary,
  alignValue = "flex-start",
}) {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text
          style={[styles.title, { color: textColor, alignSelf: alignValue }]}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {IconComponent && (
        <MaterialCommunityIcons
          color={colors.placeholderText}
          name={IconComponent}
          size={25}
        />
      )}
      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    height: 46,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontWeight: "500",
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
  subtitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.placeholderText,
  },
});

export default ListItem;
