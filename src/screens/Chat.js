import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { useSelector, connect } from "react-redux";
import * as DocumentPicker from "expo-document-picker";
import { AsyncStorage } from "react-native";

import ChatMessage from "../components/chat/ChatMessage";
import { Screen } from "../components/Screen";
import colors from "../constants/colors";
import { getChatThread } from "../redux/actions/chat";
import { postChatMessage } from "../redux/actions/chat";
import Pill from "../components/Pill";

const getUserId = (callback) => {
  try {
    AsyncStorage.getItem("userId", (err, value) => {
      if (value !== null) {
        let storedUID = JSON.parse(value);
        callback(storedUID);
      }
    });
  } catch (error) {
    Alert.alert("Oops", error.message);
  }
};

function Chat({ navigation, route, postChat, getChatThread, items }) {
  const loading = useSelector((state) => state.application.loading);
  const listRef = useRef(null);
  const [attachmentFile, setAttachmentFile] = useState("");
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [message, setMessage] = useState("");
  const { conID } = route.params;
  const [userId, setUserId] = useState("");
  const [intervalValue, setIntervalValue] = useState();

  const renderChatBubble = ({ item }) => {
    return <ChatMessage item={item} isReply={userId !== item.sender.id} />;
  };

  useEffect(() => {
    getChatThread(conID);
    getUserId(setUserId);

    /* return navigation.addListener("focus", () => {
      setIntervalValue(
        setInterval(() => {
          //console.log(conID);
        }, 5000)
      );
    }); */
  }, []);

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

  const clearAttachment = (index) => {
    // props.setAttachmentFiles(null);
    let newAttachmentList = attachmentFiles;
    newAttachmentList.splice(index, 1);
    setAttachmentFiles(newAttachmentList);
    setAttachmentFiles((prevItems) => [...prevItems]);
  };

  const onSendMessagePress = () => {
    if (!message && !attachmentFiles) return;
    const newMessage = {
      files: attachmentFiles,
      message: message,
    };
    postChat(newMessage, conID);
    setMessage("");
    setAttachmentFiles([]);
  };

  return (
    <Screen style={{ flex: 1, flexDirection: "column" }} loading={loading}>
      <FlatList
        data={items}
        renderItem={renderChatBubble}
        ref={listRef}
        inverted={true}
        keyExtractor={(item) => item.id.toString()}
      />

      <View>
        {attachmentFiles ? (
          <View style={styles.footerFile}>
            {attachmentFiles.map((file) => {
              return (
                <Pill
                  label={file.res.name}
                  removePill={() => clearAttachment()}
                />
              );
            })}

            {/* <Pill
              label={attachmentFile.name}
              removePill={() => setAttachmentFile("")}
            /> */}
          </View>
        ) : null}
        <View style={styles.footer}>
          {attachmentFiles.length < 5 ? (
            <TouchableOpacity onPress={onAddAttachment}>
              <Image
                source={require("../../assets/images/chatAddNew.png")}
                style={styles.btnAddNew}
              />
            </TouchableOpacity>
          ) : null}
          <TextInput
            style={styles.messageTextInput}
            value={message}
            autoCapitalize="none"
            placeholder="Write message..."
            placeholderTextColor={colors.chatInputPlaceholder}
            onChangeText={(value) => setMessage(value)}
          />
          <TouchableOpacity
            style={styles.btnSendWrapper}
            onPress={onSendMessagePress}
          >
            <Image
              source={require("../../assets/images/chatSend.png")}
              style={styles.btnSend}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: 80,
    display: "flex",
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  footerFile: {
    width: "100%",
    paddingTop: 10,
    paddingLeft: 20,
    backgroundColor: colors.white,
    justifyContent: "flex-start",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  main: {
    flex: 1,
  },
  btnAddNew: {
    width: 24.5,
    height: 24.5,
    marginTop: 21,
    marginLeft: 20,
  },
  btnSend: {
    width: 48,
    height: 48,
  },
  btnSendWrapper: {
    marginRight: 16,
    marginTop: 10,
  },
  messageTextInput: {
    flex: 1,
    height: 48,
    borderRadius: 5,
    backgroundColor: colors.textInputBg,
    paddingLeft: 15.5,
    marginRight: 10,
    marginLeft: 15,
    marginTop: 10,
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },
  FlexGrowOne: {
    flexGrow: 1,
  },
});

const mapDispatchToProps = (dispatch) => ({
  postChat: (chatData, conversationId) =>
    dispatch(postChatMessage(chatData, conversationId)),
  getChatThread: (conversationId) => dispatch(getChatThread(conversationId)),
});

const mapStateToProps = (state) => ({
  items: state.chat.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
