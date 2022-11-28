import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../constants/colors";

const win = Dimensions.get("window");

export default function Pill({
  label,
  iconLeft,
  icon,
  removePill,
  openAttachment,
}) {
  return (
    <>
      {iconLeft === true ? (
        <>
          <TouchableOpacity onPress={openAttachment}>
            <View style={styles.chatAttachment}>
              <Icon
                name={icon}
                size={25}
                color={colors.placeholderText}
                style={styles.iconLeftStyle}
              />
              <Text numberOfLines={1} style={styles.label}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <ScrollView horizontal>
              <Text numberOfLines={1} style={styles.label}>
                {label}
              </Text>
            </ScrollView>
          </View>
          {removePill && (
            <TouchableOpacity onPress={removePill}>
              <Icon
                name="close"
                size={25}
                color={colors.placeholderText}
                style={styles.iconStyle}
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 5,
    backgroundColor: colors.attachmentPillBackground,
    color: colors.label,
    paddingHorizontal: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginRight: 10,
    overflow: "hidden",
    width: "45%",
  },
  labelContainer: {
    width: "90%",
  },
  label: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.label,
    alignSelf: "center",
  },
  iconStyle: {},
  iconLeftStyle: {
    left: -5,
    marginRight: 0,
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
  chatAttachment: {
    height: 48,
    borderRadius: 5,
    backgroundColor: colors.attachmentPillBackground,
    color: colors.label,
    paddingHorizontal: 13,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    marginTop: 10,
  },
});
