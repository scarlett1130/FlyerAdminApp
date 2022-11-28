import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";
import colors from "../../constants/colors";
import { formatTimestamp } from "../../common/timeUtils";

export default function ChatRoom({ onClick, summary }) {
  const timestamp = formatTimestamp(summary.last_message.created);
  const source = {
    html: `<span style='color:#9D9D9D;font-family:Lato-Regular;font-size:14px;margin-top:3px;'>${summary.last_message.message}</span>`,
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.groupNameTime}>
          <Text numberOfLines={1} style={styles.groupName}>
            {summary.unit.name}
          </Text>
          <Text numberOfLines={1} style={styles.msgTime}>
            {timestamp}
          </Text>
        </View>
        <View style={styles.latestMessageCointaner}>
          {summary.unread_count === 0 ? null : (
            <View style={styles.badge}>
              <Text style={styles.badgeValue}>{summary.unread_count}</Text>
            </View>
          )}
          <Text numberOfLines={1} style={styles.latestMessageName}>
            {summary.recipient.first_name} {summary.recipient.last_name}
          </Text>
        </View>
        {summary && summary.last_message && summary.last_message.message ? (
          <RenderHtml
            source={source}
            ignoredStyles={["height", "width", "fontFamily"]}
            contentWidth={220}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingLeft: 19,
    paddingRight: 19,
    paddingTop: 13,
    paddingBottom: 17,
    height: 110,
    textAlign: "left",
    borderRadius: 5,
    backgroundColor: colors.white,
    color: colors.label,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 1.0,
    marginBottom: 15,
    width: win.width - 40,
    overflow: "hidden",
    elevation: 1,
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
  groupName: {
    fontFamily: "Lato-Bold",
    fontSize: 15,
    paddingBottom: 5,
    color: colors.label,
    width: "70%",
  },
  latestMessageName: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.label,
  },
  latestMessageText: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.placeholderText,
    marginTop: 3,
  },
  latestMessageCointaner: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  badge: {
    minWidth: 22,
    height: 16,
    backgroundColor: colors.badge,
    borderRadius: 6.38,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  badgeValue: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 12,
  },
});
