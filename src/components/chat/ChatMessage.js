import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
} from "react-native";
import RenderHtml from "react-native-render-html";
import base64 from "Base64";
import Pill from "../Pill";
import Triangle from "react-native-triangle";
import { formatTimestamp } from "../../common/timeUtils";
import { AttachmentsUrl } from "../../constants/api";
import colors from "../../constants/colors";

export default function ChatMessage({ item, isReply }) {
  const [showTranslated, setShowTranslated] = useState(false);
  const source = {
    html: `<span style='color:#1C3739;font-family:Lato-Regular;font-size:15px;'>${item.message}</span>`,
  };

  const attList = item.attachment ? item.attachment.split(",") : null;

  if (isReply) {
    // console.log(item.message, ', translation: ', item.translation);
    const message = showTranslated
      ? item.conversation_message_translations.message
      : item.message;
    const sourceReply = {
      html: `<span style='color:#FFF;font-family:Lato-Regular;font-size:15px;'>${message}</span>`,
    };

    return (
      <View style={styles.replyContainer}>
        <View style={styles.wrapper}>
          <View style={styles.replyMeta}>
            <Text style={styles.timestamp}>
              {formatTimestamp(item.created)}
            </Text>
            {item.conversation_message_translations.message && (
              <TouchableOpacity
                onPress={() => setShowTranslated(!showTranslated)}
              >
                <Text style={styles.translate}>
                  {showTranslated ? "Original" : "Translate"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bubbleWrapper}>
            <Triangle
              width={15}
              height={18}
              color={colors.placeholderText}
              direction="left"
            />
            <View style={styles.replyChatBubble}>
              <Text style={styles.replySenderName}>
                {`${item.sender.first_name} ${item.sender.last_name}`}
              </Text>
              <RenderHtml
                source={sourceReply}
                ignoredStyles={["height", "width", "fontFamily"]}
                imagesMaxWidth={220}
                contentWidth={220}
              />
              {item.attachment
                ? attList.map((file) => {
                    return (
                      <Pill
                        style={styles.attachmentPill}
                        openAttachment={() =>
                          Linking.openURL(AttachmentsUrl + file)
                        }
                        label={file.slice(15)}
                        iconLeft
                        icon="attachment"
                      />
                    );
                  })
                : /* (
                <Pill
                  openAttachment={() =>
                    Linking.openURL(AttachmentsUrl + item.attachment)
                  }
                  label={base64.atob(item.attachment.slice(15))}
                  iconLeft
                  icon="attachment"
                  style={styles.attachmentPill}
                />
              ) */
                  null}
            </View>
          </View>
        </View>
      </View>
    );
  }

  //console.log('Message:', item);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.timestamp}>{formatTimestamp(item.created)}</Text>
        <View style={styles.bubbleWrapper}>
          <View style={styles.chatBubble}>
            <RenderHtml
              source={source}
              ignoredStyles={["height", "width", "fontFamily"]}
              imagesMaxWidth={220}
              contentWidth={220}
            />
            {item.attachment
              ? attList.map((file) => {
                  return (
                    <Pill
                      style={styles.attachmentPill}
                      openAttachment={() =>
                        Linking.openURL(AttachmentsUrl + file)
                      }
                      label={file.slice(15)}
                      iconLeft
                      icon="attachment"
                    />
                  );
                }) /*(
              <Pill
                style={styles.attachmentPill}
                openAttachment={() =>
                  Linking.openURL(AttachmentsUrl + item.attachment)
                }
                label={item.attachment.slice(15)}
                iconLeft
                icon="attachment"
              />
            ) */
              : null}
          </View>
          <Triangle width={15} height={18} direction="right" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "flex-end",
    paddingVertical: 5,
    paddingHorizontal: "3%",
  },
  wrapper: {
    width: "75%",
  },
  bubbleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  timestamp: {
    fontFamily: "Lato-Regular",
    fontSize: 13,
    color: colors.placeholderText,
    lineHeight: 16,
    paddingVertical: 3,
    marginRight: 5,
  },
  chatBubble: {
    backgroundColor: colors.white,
    borderRadius: 5,
    flex: 1,
    padding: 15,
    borderBottomColor: colors.chatBubbleBotBorder,
    borderBottomWidth: 1,
  },
  messageText: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.label,
    lineHeight: 18,
  },
  replyContainer: {
    display: "flex",
    alignItems: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: "3%",
  },
  replyMeta: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  replyChatBubble: {
    backgroundColor: colors.placeholderText,
    borderRadius: 5,
    flex: 1,
    padding: 15,
  },
  translate: {
    fontFamily: "Lato-Regular",
    fontSize: 13,
    color: colors.primary,
    lineHeight: 16,
    paddingVertical: 3,
    textDecorationLine: "underline",
  },
  pillContainer: {
    marginTop: 10,
  },
  attachmentPill: {
    marginTop: 20,
  },
  replySenderName: {
    fontFamily: "Lato-Bold",
    fontSize: 15,
    color: colors.white,
    lineHeight: 18,
  },
  replyMessageText: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.white,
    lineHeight: 18,
  },
});
