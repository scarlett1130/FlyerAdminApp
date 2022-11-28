import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import colors from "../../constants/colors";
import ListItem from "../ListItem";
import SeparatorLine from "../SeparatorLine";
import CheckListModal from "../CheckListModal";
import {
  getStudents,
  selectStudent,
  addStudents,
} from "../../redux/actions/students";
import {
  addContacts,
  getContacts,
  selectContact,
} from "../../redux/actions/contacts";
import { useStudents } from "../../hooks/fetch_students_hook";

function AddContacts({
  unitId,
  contacts,
  getStudents,
  getContacts,
  selectStudentContact,
  selectContact,
  addStudents,
  addContacts,
}) {
  const [studentVerifiedContactsVisible, setStudentVerifiedContactsVisible] =
    useState(false);
  const [verifiedContactsVisible, setVerifiedContactsVisible] = useState(false);
  const [
    selectAllStudentVerifiedContacts,
    setSelectAllStudentVerifiedContacts,
  ] = useState(false);
  const [selectAllVerifiedContacts, setSelectAllVerifiedContacts] =
    useState(false);
  const [students, fetchMoreStudents] = useStudents();
  const [filteredContacts, setFilteredContacts] = useState(contacts);
  const [filteredStudents, setFilteredStudents] = useState(students);

  useEffect(() => {
    getStudents(1);
    getContacts(1);
  }, [unitId]);

  useEffect(() => {
    setFilteredContacts(contacts);
    setFilteredStudents(students);
  }, [students, contacts]);

  useEffect(() => {
    if (selectAllStudentVerifiedContacts === true) {
      let newContacts = filteredStudents.map((contact, i) => {
        contact.checked = true;
        return contact;
      });
      setFilteredStudents(newContacts);
    } else {
      let newContacts = filteredStudents.map((contact, i) => {
        contact.checked = false;
        return contact;
      });
      setFilteredStudents(newContacts);
    }

    if (selectAllVerifiedContacts === true) {
      let newContacts = filteredContacts.map((contact, i) => {
        contact.checked = true;
        return contact;
      });
      setFilteredContacts(newContacts);
    } else {
      let newContacts = filteredContacts.map((contact, i) => {
        contact.checked = false;
        return contact;
      });
      setFilteredContacts(newContacts);
    }
  }, [selectAllStudentVerifiedContacts, selectAllVerifiedContacts]);

  const onSelectAllStudents = () => {
    setSelectAllStudentVerifiedContacts(!selectAllStudentVerifiedContacts);
  };

  const onSelectAllContacts = () => {
    setSelectAllVerifiedContacts(!selectAllVerifiedContacts);
  };

  const onSearchContacts = (input) => {
    const filteredContacts = contacts.filter((c) => {
      return (
        c.first_name.toLowerCase().includes(input.toLowerCase()) ||
        c.last_name.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredContacts(filteredContacts);
  };

  const onSearchStudents = (input) => {
    const filteredStudents = students.filter((c) => {
      return (
        c.first_name.toLowerCase().includes(input.toLowerCase()) ||
        c.last_name.toLowerCase().includes(input.toLowerCase())
      );
    });
    setFilteredStudents(filteredStudents);
  };
  const onAddStudentsClick = () => {
    addStudents();
    setStudentVerifiedContactsVisible(false);
  };

  const onAddContactsClick = () => {
    addContacts();
    setVerifiedContactsVisible(false);
  };
  const onAddContactsStudent = () => {
    unitId ? setStudentVerifiedContactsVisible(true) : null;
  };

  const onAddContacts = () => {
    unitId ? setVerifiedContactsVisible(true) : null;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onAddContactsStudent}>
        <ListItem
          title="Add Verified Contacts by Student"
          IconComponent="chevron-right"
          textColor={colors.primary}
        ></ListItem>
      </TouchableOpacity>
      <SeparatorLine />
      <TouchableOpacity onPress={onAddContacts}>
        <ListItem
          title="Add Verified Contacts"
          IconComponent="chevron-right"
          textColor={colors.primary}
        ></ListItem>
      </TouchableOpacity>
      <CheckListModal
        title={"Add Verified Contacts by Student"}
        filteredList={filteredStudents}
        onSearch={onSearchStudents}
        onSelectAll={onSelectAllStudents}
        searchPlaceholder={"Search Students"}
        selectAllListItems={selectAllStudentVerifiedContacts}
        selectListItem={selectStudentContact}
        showModal={setStudentVerifiedContactsVisible}
        isModalVisible={studentVerifiedContactsVisible}
        onAdd={onAddStudentsClick}
        // fetchMore={fetchMoreStudents}
      />
      <CheckListModal
        title={"Add Verified Contacts"}
        filteredList={filteredContacts}
        onSearch={onSearchContacts}
        onSelectAll={onSelectAllContacts}
        searchPlaceholder={"Search Contacts"}
        selectAllListItems={selectAllVerifiedContacts}
        selectListItem={selectContact}
        showModal={setVerifiedContactsVisible}
        isModalVisible={verifiedContactsVisible}
        onAdd={onAddContactsClick}
        // fetchMore={fetchMoreContacts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 92,
    marginTop: 13,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});

const mapDispatchToProps = (dispatch) => ({
  getStudents: (page) => dispatch(getStudents(page)),
  getContacts: (page) => dispatch(getContacts(page)),
  selectStudentContact: (i) => dispatch(selectStudent(i)),
  selectContact: (i) => dispatch(selectContact(i)),
  addStudents: () => dispatch(addStudents()),
  addContacts: () => dispatch(addContacts()),
});

const mapStateToProps = (state) => ({
  students: state.students.items,
  contacts: state.contacts.items,
  unitId: state.conversations.unitId,
});
export default connect(mapStateToProps, mapDispatchToProps)(AddContacts);
