import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

import colors from "../../constants/colors";
import ListItem from "../ListItem";
import SeparatorLine from "../SeparatorLine";
import Pill from "../Pill";

export default function NewChatMessage({setAttachmentFiles, attachmentFiles, message, setMessage}) {
  const onAddAttachment = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync();
      res.type != "cancel"
        ? setAttachmentFiles((prevItems) => [...prevItems, { res }])
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
  const onChangeMessage = (item) => {
    setMessage(item);
    console.log(attachmentFiles)
  };

  const clearAttachment = (index) => {
   // props.setAttachmentFiles(null);
    let newAttachmentList = attachmentFiles;
    newAttachmentList.splice(index, 1);
    setAttachmentFiles(newAttachmentList);
    setAttachmentFiles((prevItems) => [...prevItems]);
  };
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.sectionTitle}>Message</Text>
      <View style={styles.messageSection}>
        <Text style={styles.messageTitle}>Message</Text>
        <TextInput
          style={styles.messageInputStyle}
          value={message}
          onChangeText={(val) => onChangeMessage(val)}
          placeholder={"Enter"}
          multiline
        />
        {attachmentFiles.length < 5 && (
          <TouchableOpacity
            onPress={() => {
              onAddAttachment();
            }}
          >
            <ListItem
              title="Add Attachment"
              IconComponent="chevron-right"
              textColor={colors.primary}
            ></ListItem>
          </TouchableOpacity>
        )}
        {attachmentFiles.length <5 && <SeparatorLine />}
        <View style={styles.attachmentsList}>
          {attachmentFiles ? (
             attachmentFiles.map((file, y) => {
                return (
                  <Pill
                    label={file.res.name}
                    removePill={() => clearAttachment()}
                  />
                );
              }) 
            /*<Pill
              label={attachmentFiles.name}
              removePill={() => clearAttachment()}
            />*/
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
  messageTitle: {
    fontFamily: "Lato-Regular",
    color: colors.label,
    fontSize: 16,
    marginVertical: 10,
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
  messageSection: {
    marginTop: 13,
    minHeight: 316,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "column",
    paddingHorizontal: 13,
  },
  attachmentsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 9,
  },
  sectionTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.placeholderText,
    alignSelf: "flex-start",
  },
});
