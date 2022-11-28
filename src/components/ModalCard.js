import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

export const ModalCard = ({
  visible = false,
  onPressClose,
  title,
  children,
  scrollable = true,
}) => {
  if (scrollable) {
    return (
      <Modal animationType="fade" transparent visible={visible}>
        <View style={styles.overlay}>
          <ScrollView
            style={{ height: "100%" }}
            overScrollMode="never"
            contentContainerStyle={styles.container}
          >
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => onPressClose(false)}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={25}
                    color={colors.placeholderText}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              {children}
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.overlay}>
        <View style={[{ height: "100%" }, styles.container]}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => onPressClose(false)}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={25}
                  color={colors.placeholderText}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#00000057",
    flex: 1,
  },
  container: {
    paddingTop: win.height / 10,
    paddingHorizontal: "5%",
    height: win.height,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingVertical: 13,
    paddingHorizontal: 18,
    minHeight: "70%",
    maxHeight: "130%",
    width: "100%",
    alignItems: "stretch",
    flexDirection: "column",
    top: -40,
  },
  header: {
    textAlign: "left",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    color: colors.label,
    marginBottom: 10,
    textAlign: "left",
    marginRight: 20,
  },
  closeIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    right: 0,
    bottom: "31%",
  },
  separator: {
    backgroundColor: colors.gray,
    marginBottom: 5,
    width: "100%",
    height: 1,
  },
});
