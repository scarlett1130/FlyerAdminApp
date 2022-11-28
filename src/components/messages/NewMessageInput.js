import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Chevron } from "react-native-shapes";
import * as DocumentPicker from "expo-document-picker";

import colors from "../../constants/colors";
import Pill from "../Pill";
import SeparatorLine from "../SeparatorLine";

export default function NewMessageInput({
  title,
  setTitle,
  message,
  setMessage,
  attachmentFile,
  setAttachmentFile,
}) {
  const onAddAttachment = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      res.type != "cancel"
        ? setAttachmentFile(res) //((prevItems) => [...prevItems, { res }])
        : null;
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert("Canceled from single doc picker");
        //props.setAttachmentFiles((prevItems) => [...prevItems]);
      } else {
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };
  const clearAttachment = () => {
    setAttachmentFile(null);
  };

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.sectionTitleInner}>Message</Text>
      <View style={styles.messageSection}>
        <Text style={styles.messageTitle}>Title</Text>
        <TextInput
          style={styles.messageInputStyleTitle}
          value={title}
          onChangeText={(val) => setTitle(val)}
          placeholder={"Enter"}
          numberOfLines={1}
        />
        <Text style={styles.messageTitle}>Message</Text>
        <TextInput
          style={styles.messageInputStyle}
          value={message}
          onChangeText={(val) => setMessage(val)}
          placeholder={"Enter"}
          multiline
        />
        {!attachmentFile && (
          <>
            <TouchableOpacity
              onPress={() => {
                onAddAttachment();
              }}
            >
              <View style={styles.addContactsRow}>
                <Text style={styles.addContactsText}>Add Attachment</Text>
                <Chevron
                  rotate={270}
                  size={1.5}
                  color={colors.placeholderText}
                  style={styles.iconStyle}
                />
              </View>
            </TouchableOpacity>
            <SeparatorLine />
          </>
        )}
        <View style={styles.chatWithList}>
          {attachmentFile && attachmentFile.name ? (
            <Pill
              label={attachmentFile.name}
              removePill={() => clearAttachment()}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    width: "90%",
    marginTop: 3,
    marginBottom: 13,
  },
  messageSection: {
    marginTop: 13,
    minHeight: 316,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "column",
    paddingHorizontal: 13,
  },
  messageInputStyle: {
    backgroundColor: colors.textInputBg,
    borderRadius: 5,
    paddingHorizontal: 21,
    fontFamily: "Lato-Regular",
    color: colors.placeholderText,
    fontSize: 16,
    minHeight: 150,
    marginBottom: 5,
    paddingTop: 15,
    textAlignVertical: "top",
  },
  messageInputStyleTitle: {
    backgroundColor: colors.textInputBg,
    borderRadius: 5,
    paddingHorizontal: 21,
    fontFamily: "Lato-Regular",
    color: colors.placeholderText,
    fontSize: 16,
    minHeight: 48,
    marginBottom: 5,
  },
  messageTitle: {
    fontFamily: "Lato-Regular",
    color: colors.label,
    fontSize: 16,
    marginVertical: 10,
  },
  sectionTitleInner: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.placeholderText,
    alignSelf: "flex-start",
  },
  chatWithList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 9,
  },
  addContactsRow: {
    flexDirection: "row",
    height: 46,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },
  addContactsText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.primary,
    alignSelf: "center",
  },
  iconStyle: {
    alignSelf: "center",
    top: 3,
  },
});
