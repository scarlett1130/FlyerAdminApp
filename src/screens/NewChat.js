import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

import AddContacts from "../components/chat/AddContacts";
import ChatGroupSelect from "../components/chat/ChatGroupSelect";
import { Screen } from "../components/Screen";
import colors from "../constants/colors";
import Pill from "../components/Pill";
import NewChatMessage from "../components/chat/NewChatMessage";
import AppButton from "../components/Button";

import { unSelectContactsByStudents } from "../redux/actions/students";
import { unSelectContact } from "../redux/actions/contacts";
import { postConversation } from "../redux/actions/chat";
import { clearContacts } from "../redux/actions/contacts";
import { clearContactsByStudents } from "../redux/actions/students";

function NewChat({
  navigation,
  unitId,
  addedContacts,
  clearContactsByStudents,
  clearContacts,
  addedContactsByStudent,
  postConversation,
  unSelectContactsByStudents,
  unSelectContact,
}) {
  const [message, setMessage] = useState("");
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const [value, setValue] = useState(0);

  const numberOfRecipients =
    addedContactsByStudent.length + addedContacts.length;
  const fewRecipients = numberOfRecipients <= 10;

  const onPressSend = () => {
    let studentContacts = addedContactsByStudent.map((s, i) => {
      return s.id;
    });
    let otherContacts = addedContacts.map((o, i) => {
      return o.id;
    });

    let newConversation = {
      contacts: studentContacts.concat(otherContacts),
      message: message,
      files: attachmentFiles,
      unit: unitId,
    };
    postConversation(newConversation);
    // clear state
    clearContactsByStudents();
    clearContacts();
    navigation.replace("ChatOverview");
  };

  const onClearAll = () => {
    clearContactsByStudents();
    clearContacts();
  };

  return (
    <Screen loading={false}>
      <ScrollView contentContainerStyle={styles.container}>
        <ChatGroupSelect setValue={setValue} value={value} />
        <AddContacts />

        <View style={styles.chatWithListContainer}>
          <Text style={styles.sectionTitle}>Chat With List</Text>
          <Text style={styles.sectionSubtitle}>
            Each recipient will receive this message as a private one-to-one
            chat.
          </Text>
          <View style={styles.chatWithList}>
            {!fewRecipients && (
              <TouchableOpacity style={{ flex: 1 }} onPress={onClearAll}>
                <Pill label="...     Clear all" />
              </TouchableOpacity>
            )}
            {fewRecipients &&
              addedContactsByStudent.map((student, x) => {
                return (
                  <Pill
                    label={`${student.first_name} ${student.last_name}`}
                    removePill={() => unSelectContactsByStudents(student.id)}
                  />
                );
              })}
            {fewRecipients &&
              addedContacts.map((contact, y) => {
                return (
                  <Pill
                    label={`${contact.first_name} ${contact.last_name}`}
                    removePill={() => unSelectContact(contact.id)}
                  />
                );
              })}
          </View>
        </View>

        <NewChatMessage
          setMessage={setMessage}
          message={message}
          setAttachmentFiles={setAttachmentFiles}
          attachmentFiles={attachmentFiles}
        />
        {numberOfRecipients > 0 ? (
          <AppButton title="Send" onPress={onPressSend} width="40%" />
        ) : null}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    backgroundColor: colors.textInputBg,
    paddingBottom: 20,
  },
  chatWithListContainer: {
    width: "90%",
    marginTop: 12,
    marginBottom: 12,
  },
  chatWithList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 9,
  },
  sectionSubtitle: {
    fontFamily: "Lato-Regular",
    fontSize: 13,
    color: colors.timestamp,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  sectionTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.placeholderText,
    alignSelf: "flex-start",
  },
});

const mapDispatchToProps = (dispatch) => ({
  postConversation: (conversationData) =>
    dispatch(postConversation(conversationData)),
  clearContacts: () => dispatch(clearContacts()),
  clearContactsByStudents: () => dispatch(clearContactsByStudents()),
  unSelectContactsByStudents: (id) => dispatch(unSelectContactsByStudents(id)),
  unSelectContact: (id) => dispatch(unSelectContact(id)),
});

const mapStateToProps = (state) => ({
  students: state.students.items,
  contacts: state.contacts.items,
  addedStudents: state.students.addedStudents,
  addedContactsByStudent: state.students.addedContactsByStudent,
  addedContacts: state.contacts.addedContacts,
  unitId: state.conversations.unitId,
});
export default connect(mapStateToProps, mapDispatchToProps)(NewChat);
