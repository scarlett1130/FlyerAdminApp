import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { connect } from "react-redux";

import {
  addUnits,
  addContacts,
  createMessage,
  resetNewMessage,
  updateMessage,
} from "../redux/actions/message";
import { clearDistricts } from "../redux/actions/districts";
import { clearGroups } from "../redux/actions/groups";
import { clearSchools } from "../redux/actions/schools";
import NewMessageInput from "../components/messages/NewMessageInput";
import NewMessageOptionButtons from "../components/messages/NewMessageOptionButtons";
import NewMessageRecipientList from "../components/messages/NewMessageRecipientList";
import NewMessageRecipients from "../components/messages/NewMessageRecipients";
import NewMessageType from "../components/messages/NewMessageType";
import colors from "../constants/colors";

function NewMessage({
  addContacts,
  addUnits,
  navigation,
  resetNewMessage,
  clearSchools,
  clearGroups,
  clearDistricts,
  updateMessage,
  createMessage,
  newMessage,
  route,
}) {
  const [addedUnits, setAddedUnits] = useState([]);
  const [addedContacts, setAddedContacts] = useState([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [attachmentFile, setAttachmentFile] = useState("");

  const [scheduledTimestamp, setScheduledTimestamp] = useState("");
  const { mode, data } = route.params;

  useEffect(() => {
    navigation.addListener("blur", () => {
      clearState();
    });
  }, [navigation]);

  const clearState = () => {
    resetNewMessage();
    clearSchools();
    clearGroups();
    clearDistricts();
  };

  useEffect(() => {
    if (mode === "edit" || mode === "copy") {
      mapPropsToState();
    }
  }, []);
  //fill data if editing or copying message
  const mapPropsToState = () => {
    setMessage(data.body);
    setTitle(data.title);
    setAttachmentFile(data.attachment);

    let unit_ids = [];
    data.recipients?.units?.data?.map((unit, i) => {
      setAddedUnits((prevState) => prevState.concat([unit]));
      unit_ids.push(unit.id);
    });
    addUnits(unit_ids);

    let contact_ids = [];
    data.recipients?.users?.data?.map((contact, i) => {
      setAddedContacts((prevState) => prevState.concat([contact]));
      contact_ids.push(contact.id);
    });
    addContacts(contact_ids);
  };

  const handleSend = (draft, scheduled) => {
    let msgdata = { ...newMessage };
    msgdata.message = message;
    msgdata.title = title;
    msgdata.scheduled_timestamp = scheduled
      ? scheduledTimestamp.toString()
      : "";
    msgdata.is_draft = draft;
    msgdata.files = attachmentFile;
    if (mode === "edit") {
      updateMessage(msgdata, data.id);
    } else {
      createMessage(msgdata);
    }
  };

  const handleScheduleMessage = () => {
    handleSend(false, true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <NewMessageType />
        <NewMessageRecipients
          addedUnits={addedUnits}
          setAddedUnits={setAddedUnits}
          addedContacts={addedContacts}
          setAddedContacts={setAddedContacts}
        />
        <NewMessageRecipientList
          addedUnits={addedUnits}
          setAddedUnits={setAddedUnits}
          addedContacts={addedContacts}
          setAddedContacts={setAddedContacts}
        />
        <NewMessageInput
          title={title}
          setTitle={setTitle}
          message={message}
          setMessage={setMessage}
          attachmentFile={attachmentFile}
          setAttachmentFile={setAttachmentFile}
        />
        <NewMessageOptionButtons
          onScheduleMessage={handleScheduleMessage}
          onSendPress={handleSend}
          setScheduledTimestamp={setScheduledTimestamp}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    backgroundColor: colors.textInputBg,
  },
});

const mapDispatchToProps = (dispatch) => ({
  clearGroups: () => dispatch(clearGroups()),
  clearDistricts: () => dispatch(clearDistricts()),
  clearSchools: () => dispatch(clearSchools()),
  addUnits: (units) => dispatch(addUnits(units)),
  addContacts: (contacts) => dispatch(addContacts(contacts)),
  resetNewMessage: () => dispatch(resetNewMessage()),
  createMessage: (data) => dispatch(createMessage(data)),
  updateMessage: (data, id) => dispatch(updateMessage(data, id)),
});

const mapStateToProps = (state) => ({
  newMessage: state.message.newMessage,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
