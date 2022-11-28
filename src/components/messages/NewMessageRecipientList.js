import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import colors from "../../constants/colors";
import Pill from "../Pill";
import { removeUnit, removeContact } from "../../redux/actions/message";

function NewMessageRecipientList({
  removeUnit,
  removeContact,
  addedUnits,
  setAddedUnits,
  addedContacts,
  setAddedContacts,
}) {
  //console.log("units", addedUnits);
  const onRemoveUnit = (unitId) => {
    removeUnit(unitId);
    let index = addedUnits.findIndex((x) => x.id === unitId);
    let newUnits = addedUnits;
    newUnits.splice(index, 1);
    setAddedUnits(newUnits);
  };

  const onRemoveContact = (contactId) => {
    removeContact(contactId);
    let index = addedContacts.findIndex((x) => x.id === contactId);
    let newContacts = addedContacts;
    newContacts.splice(index, 1);
    setAddedContacts(newContacts);
  };

  const numberOfRecipients = addedUnits.length + addedContacts.length;
  const fewRecipients = numberOfRecipients <= 10;

  return (
    <View style={styles.chatWithListContainer}>
      <Text style={styles.sectionTitleInner}>Send List</Text>
      <View style={styles.chatWithList}>
        {!fewRecipients && (
          <Pill label={`${numberOfRecipients} Recipients selected`} />
        )}
        {fewRecipients &&
          addedUnits.map((unit, index) => {
            if (unit.length !== 0) {
              return (
                <Pill
                  label={unit.name}
                  removePill={() => onRemoveUnit(unit.id)}
                />
              );
            }
          })}
        {fewRecipients &&
          addedContacts.map((contact, index) => {
            if (contact.length !== 0) {
              return (
                <Pill
                  label={`${contact.first_name} ${contact.last_name}`}
                  removePill={() => onRemoveContact(contact.id)}
                />
              );
            }
          })}
      </View>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  removeUnit: (unitId) => dispatch(removeUnit(unitId)),
  removeContact: (id) => dispatch(removeContact(id)),
});

const mapStateToProps = (state) => ({
  newMessage: state.message.newMessage,
});

const styles = StyleSheet.create({
  sectionTitleInner: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.placeholderText,
    alignSelf: "flex-start",
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageRecipientList);
