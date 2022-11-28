import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../../constants/colors";

export default function MessageOptions({ status, onEdit, onCopy, onArchive }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => onEdit()}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => onCopy()}>
        <Text style={styles.buttonText}>Copy</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onArchive()}>
        {status.status === "archived" ? (
          <Text style={styles.buttonText}>Restore</Text>
        ) : (
          <Text style={styles.buttonText}>Archive</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: "31%",
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 19,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between",
    width: "100%",
  },
});
