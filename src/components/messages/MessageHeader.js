import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { getRecipientsSummary } from "../../common/recipient_utils";
import { formatTimestamp } from "../../common/timeUtils";
import colors from "../../constants/colors";

export default function MessageHeader({ data, type }) {
  const timestamp = data && data.created ? formatTimestamp(data.created) : "";
  const creator =
    data && data.creator
      ? data.creator.first_name + " " + data.creator.last_name
      : "";
  const recipients = getRecipientsSummary(data);

  return (
    <>
      <View style={styles.titleContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.titleText}>Sender: </Text>
          <Text style={styles.titleTextValue}>{creator}</Text>
        </View>
        <Text style={styles.timestamp}>{"Edited:" + " " + timestamp}</Text>
      </View>
      {!type && (
        <View style={styles.nameContainer}>
          <Text style={styles.titleText}>Recipients: </Text>
          <ScrollView horizontal style={{ marginRight: 10 }}>
            <Text style={styles.titleTextValue}>{recipients}</Text>
          </ScrollView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  nameContainer: {
    flexDirection: "row",
  },
  titleText: {
    color: colors.label,
    fontFamily: "Lato-Regular",
    fontSize: 14,
    lineHeight: 19,
  },
  titleTextValue: {
    color: colors.label,
    fontFamily: "Lato-Regular",
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "bold",
  },
  timestamp: {
    color: colors.placeholderText,
    fontFamily: "Lato-Regular",
    fontSize: 11,
    lineHeight: 16,
    alignSelf: "flex-end",
  },
});
