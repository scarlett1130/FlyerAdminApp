import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { formatTimestamp } from "../../common/timeUtils";
import { getRecipientsSummary } from "../../common/recipient_utils";
import HTML from "react-native-render-html";
import colors from "../../constants/colors";

export default function NewsFeedItem({ data, onClick }) {
  const timestamp =
    data && data.item.created ? formatTimestamp(data.item.created) : "";
  const creator = data.item.creator
    ? data.item.creator.first_name + " " + data.item.creator.last_name
    : "";
  const recipients = getRecipientsSummary(data.item);

  const source = {
    html: `<span style="color:#9D9D9D;font-family:Lato-Regular;font-size:14px;margin-top:3px;margin-left:0px;">${data.item.body}</span>`,
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.groupNameTime}>
          <Text style={styles.groupDetails}>From: </Text>
          <Text numberOfLines={1} style={styles.personNameFrom}>
            {creator}
          </Text>
          <Text style={styles.msgTime}>{timestamp}</Text>
        </View>
        <View style={styles.messageCointaner}>
          <Text style={styles.groupDetails}>To: </Text>
          <Text numberOfLines={1} style={styles.personNameTo}>
            {recipients}
          </Text>
        </View>
        <View style={styles.messageCointanerTop}>
          <Text numberOfLines={1} style={styles.subject}>
            {data?.item?.title || ""}
          </Text>
        </View>
        <View style={styles.messageCointanerContent}>
          {data?.item?.body ? (
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
    paddingHorizontal: 19,
    paddingTop: 13,
    paddingBottom: 17,
    height: 165,
    textAlign: "left",
    borderRadius: 5,
    backgroundColor: colors.white,
    color: colors.label,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 1.0,
    marginBottom: 15,
    overflow: "hidden",
  },
  groupNameTime: {
    flexDirection: "row",
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
  personNameFrom: {
    fontFamily: "Lato-Bold",
    fontSize: 15,
    color: colors.label,
    width: "65%",
  },
  personNameTo: {
    fontFamily: "Lato-Bold",
    fontSize: 15,
    color: colors.label,
    width: "90%",
  },
  subject: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.label,
    marginBottom: 2,
  },
  latestMessageText: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.placeholderText,
  },
  messageCointanerTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  messageCointanerContent: {
    paddingRight: "10%",
    overflow: "hidden",
  },
  messageCointaner: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 2,
    marginRight: 10,
  },
  badge: {
    minWidth: 40,
    height: 16,
    backgroundColor: colors.primary,
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
