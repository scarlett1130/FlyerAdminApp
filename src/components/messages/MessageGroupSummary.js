import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { formatTimestamp } from "../../common/timeUtils";
import { getRecipientsSummary } from "../../common/recipient_utils";
import HTML from "react-native-render-html";
import colors from "../../constants/colors";

export default function MessageGroupSummary({ data, onClick }) {
  const source = {
    html: `<span style="color:#9D9D9D;font-family:Lato-Regular;font-size:14px;margin-top:3px;margin-left:0px;">${data.body}</span>`,
  };

  const timestamp = data && data.created ? formatTimestamp(data.created) : "";
  const from =
    data && data.creator
      ? data.creator.first_name + " " + data.creator.last_name
      : "";
  const recipients = getRecipientsSummary(data);
  const message_label_non_scheduled =
    data && data.message_status ? data.message_status.value : null;

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.groupNameTime}>
          {data &&
          data.scheduled_timestamp &&
          message_label_non_scheduled === null ? (
            <View style={styles.badgeScheduled}>
              <Text style={styles.badgeValue}>Scheduled</Text>
            </View>
          ) : (
            <View style={styles.badge}>
              <Text style={styles.badgeValue}>
                {message_label_non_scheduled
                  ? message_label_non_scheduled
                  : "Sent"}
              </Text>
            </View>
          )}
          <Text numberOfLines={1} style={styles.msgTime}>
            {timestamp}
          </Text>
        </View>

        <View style={styles.messageCointaner}>
          <Text numberOfLines={1} style={styles.groupDetails}>
            From:{" "}
          </Text>
          <Text numberOfLines={1} style={styles.personName}>
            {from}
          </Text>
        </View>
        <View style={styles.messageCointaner}>
          <Text numberOfLines={1} style={styles.groupDetails}>
            To:{" "}
          </Text>
          <Text numberOfLines={1} style={styles.personName}>
            {recipients}
          </Text>
        </View>
        <View style={styles.messageCointaner}>
          <Text numberOfLines={1} style={styles.subject}>
            {data ? data.title : ""}
          </Text>
        </View>
        <View style={styles.messageCointanerContent}>
          {data && data.body ? (
            <HTML
              ignoredStyles={["fontFamily"]}
              source={source}
              contentWidth={220}
            />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 13,
    paddingBottom: 17,
    height: 170,
    textAlign: "left",
    borderRadius: 5,
    backgroundColor: colors.white,
    color: colors.label,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 1.0,
    marginBottom: 15,
    overflow: "hidden",
  },
  messageCointanerContent: {
    paddingRight: "10%",
    overflow: "hidden",
  },
  groupNameTime: {
    flexDirection: "row",
    marginBottom: 5,
  },
  msgTime: {
    marginLeft: "auto",
    color: colors.timestamp,
    fontSize: 13,
    fontFamily: "Lato-Regular",
  },
  groupDetails: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    paddingBottom: 5,
    color: colors.label,
  },
  personName: {
    fontFamily: "Lato-Bold",
    fontSize: 15,
    color: colors.label,
  },
  subject: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.label,
    marginBottom: 2,
  },
  latestMessageText: {
    fontFamily: "Lato-Regular",
    fontSize: 14,
    color: colors.placeholderText,
  },
  messageCointaner: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingRight: 10,
  },
  badge: {
    minWidth: 60,
    height: 16,
    backgroundColor: colors.primary,
    borderRadius: 6.38,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    alignSelf: "flex-start",
  },
  badgeScheduled: {
    minWidth: 70,
    height: 16,
    backgroundColor: colors.badge,
    borderRadius: 6.38,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    alignSelf: "flex-start",
  },
  badgeValue: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 13,
  },
});
