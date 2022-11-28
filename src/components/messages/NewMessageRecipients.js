import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

import { addUnits, addContacts } from "../../redux/actions/message";
import { useDistricts } from "../../hooks/fetch_networks_hook";
import { useSchoolsItems } from "../../hooks/fetch_schools_hook";
import { useGroups } from "../../hooks/fetch_groups_hook";
import { useStudents } from "../../hooks/fetch_students_hook";
import { useContacts } from "../../hooks/fetch_contacts_hook";
import { selectDistrict } from "../../redux/actions/districts";
import { selectSchool } from "../../redux/actions/schools";
import { selectGroup } from "../../redux/actions/groups";
import { selectContactByID } from "../../redux/actions/contacts";
import { selectAllDistricts } from "../../redux/actions/districts";
import { selectAllStudents } from "../../redux/actions/students";
import { selectAllContacts } from "../../redux/actions/contacts";
import { selectAllGroups } from "../../redux/actions/groups";
import { selectAllSchools } from "../../redux/actions/schools";
import CheckListModalNewMessage from "./CheckListModalNewMessage";
import RecipientAddItem from "./RecipientAddItem";
import colors from "../../constants/colors";

function NewMessageRecipients({
  selectDistrict,
  selectSchool,
  selectContact,
  selectStudentById,
  selectGroup,
  selectAllStudents,
  selectAllContacts,
  selectAllGroups,
  selectAllDistricts,
  selectAllSchools,
  addedUnits,
  setAddedUnits,
  addedContacts,
  setAddedContacts,
  addUnits,
  addContacts,
}) {
  const [addNetworksVisible, setAddNetworksVisible] = useState(false);
  const [addSchoolsVisible, setAddSchoolsVisible] = useState(false);
  const [addGroupsVisible, setAddGroupsVisible] = useState(false);
  const [addContactsVisible, setAddContactsVisible] = useState(false);
  const [addContactsByStudentVisible, setAddContactsByStudentVisible] =
    useState(false);

  const [districts, fetchMoreDistricts] = useDistricts();
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [schools, fetchMoreSchools] = useSchoolsItems();
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [groups, fetchMoreGroups] = useGroups();
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [students, fetchMoreStudents] = useStudents();
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [contacts, fetchMoreContacts] = useContacts();
  const [filteredContacts, setFilteredContacts] = useState([]);

  const [searchDistrictsInput, setSearchDistrictsInput] = useState("");
  const [searchSchoolsInput, setSearchSchoolsInput] = useState("");
  const [searchGroupsInput, setSearchGroupsInput] = useState("");
  const [searchContactsInput, setSearchContactsInput] = useState("");
  const [searchStudentsInput, setSearchStudentsInput] = useState("");

  const [selectAllStudentsFlag, setSelectAllStudents] = useState(false);
  const [selectAllContactsFlag, setSelectAllContacts] = useState(false);
  const [selectAllGroupsFlag, setSelectAllGroups] = useState(false);
  const [selectAllDistrictsFlag, setSelectAllDistricts] = useState(false);
  const [selectAllSchoolsFlag, setSelectAllSchools] = useState(false);

  useEffect(() => {
    setFilteredDistricts(districts);
    setFilteredSchools(schools);
    setFilteredGroups(groups);
    setFilteredStudents(students);
    setFilteredContacts(contacts);
  }, []);

  useEffect(() => {
    if (searchDistrictsInput !== "") {
      filterDistricts();
    } else {
      setFilteredDistricts(districts);
    }
  }, [districts]);

  useEffect(() => {
    if (searchSchoolsInput !== "") {
      filterSchools();
    } else {
      setFilteredSchools(schools);
    }
  }, [schools]);

  useEffect(() => {
    if (searchGroupsInput !== "") {
      filterGroups();
    } else {
      setFilteredGroups(groups);
    }
  }, [groups]);

  useEffect(() => {
    if (searchContactsInput !== "") {
      filterContacts();
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts]);

  useEffect(() => {
    if (searchStudentsInput !== "") {
      filterStudents();
    } else {
      setFilteredStudents(students);
    }
  }, [students]);

  useEffect(() => {
    filterDistricts();
  }, [searchDistrictsInput]);

  useEffect(() => {
    filterSchools();
  }, [searchSchoolsInput]);

  useEffect(() => {
    filterGroups();
  }, [searchGroupsInput]);

  useEffect(() => {
    filterContacts();
  }, [searchContactsInput]);

  useEffect(() => {
    filterStudents();
  }, [searchStudentsInput]);

  useEffect(() => {
    if (selectAllDistricts) {
      districts.map((d, i) => {
        selectDistrict();
      });
    }
  }, [selectAllDistricts]);

  useEffect(() => {
    selectAllStudents(selectAllStudentsFlag);
  }, [selectAllStudentsFlag]);

  useEffect(() => {
    selectAllContacts(selectAllContactsFlag);
  }, [selectAllContactsFlag]);

  useEffect(() => {
    selectAllDistricts(selectAllDistrictsFlag);
  }, [selectAllDistrictsFlag]);

  useEffect(() => {
    selectAllGroups(selectAllGroupsFlag);
  }, [selectAllGroupsFlag]);

  useEffect(() => {
    selectAllSchools(selectAllSchoolsFlag);
  }, [selectAllSchoolsFlag]);

  const onSelectAllStudents = () => {
    setSelectAllStudents(!selectAllStudentsFlag);
  };

  const onSelectAllContacts = () => {
    setSelectAllContacts(!selectAllContactsFlag);
  };

  const onSelectAllSchools = () => {
    setSelectAllSchools(!selectAllSchoolsFlag);
  };

  const onSelectAllGroups = () => {
    setSelectAllGroups(!selectAllGroupsFlag);
  };

  const onSelectAllDistricts = () => {
    setSelectAllDistricts(!selectAllDistrictsFlag);
  };

  const onSearchDistricts = (input) => {
    setSearchDistrictsInput(input);
  };

  const onSearchSchools = (input) => {
    setSearchSchoolsInput(input);
  };

  const onSearchGroups = (input) => {
    setSearchGroupsInput(input);
  };

  const onSearchContacts = (input) => {
    setSearchContactsInput(input);
  };

  const onSearchStudents = (input) => {
    setSearchStudentsInput(input);
  };

  const filterDistricts = () => {
    const filteredDistricts = districts.filter((c) => {
      return c.name.toLowerCase().includes(searchDistrictsInput.toLowerCase());
    });
    setFilteredDistricts(filteredDistricts);
  };

  const filterSchools = () => {
    const filteredSchools = schools.filter((c) => {
      return c.name.toLowerCase().includes(searchSchoolsInput.toLowerCase());
    });
    setFilteredSchools(filteredSchools);
  };

  const filterGroups = () => {
    const filteredGroups = groups.filter((c) => {
      return c.name.toLowerCase().includes(searchGroupsInput.toLowerCase());
    });
    setFilteredGroups(filteredGroups);
  };

  const filterContacts = () => {
    const filteredContacts = contacts.filter((c) => {
      return (
        c.first_name
          .toLowerCase()
          .includes(searchContactsInput.toLowerCase()) ||
        c.last_name.toLowerCase().includes(searchContactsInput.toLowerCase())
      );
    });
    setFilteredContacts(filteredContacts);
  };

  const filterStudents = () => {
    const filteredStudents = students.filter((c) => {
      return (
        c.first_name
          .toLowerCase()
          .includes(searchStudentsInput.toLowerCase()) ||
        c.last_name.toLowerCase().includes(searchStudentsInput.toLowerCase())
      );
    });
    setFilteredStudents(filteredStudents);
  };

  const onAddUnits = (unitType) => {
    let newUnits = [];
    switch (unitType) {
      case "districts":
        newUnits = [];
        districts.map((d, i) => {
          if (d.checked) {
            if (!addedUnits.includes(d)) {
              newUnits.push(d.id);
              setAddedUnits((prevState) => prevState.concat(d));
            }
          }
        });
        setAddNetworksVisible(false);
        addUnits(newUnits);
        return;
      case "schools":
        newUnits = [];

        schools.map((s, i) => {
          if (s.checked) {
            if (!addedUnits.includes(s)) {
              newUnits.push(s.id);
              setAddedUnits((prevState) => prevState.concat(s));
            }
          }
        });
        setAddSchoolsVisible(false);
        addUnits(newUnits);
        return;
      case "groups":
        newUnits = [];
        groups.map((g, i) => {
          if (g.checked) {
            if (!addedUnits.includes(g)) {
              newUnits.push(g.id);
              setAddedUnits((prevState) => prevState.concat(g));
            }
          }
        });
        setAddGroupsVisible(false);
        addUnits(newUnits);
        return;
      default:
        return;
    }
  };

  const onAddContactsByStudents = () => {
    let newContacts = [];
    students.map((s, i) => {
      if (s.checked) {
        let contacts = s.contacts;
        contacts.map((c, j) => {
          if (!addedContacts.includes(c)) {
            newContacts.push(c.id);
            setAddedContacts((prevState) => prevState.concat(c));
          }
        });
      }
    });
    setAddContactsByStudentVisible(false);
    addContacts(newContacts);
  };

  const onAddContacts = () => {
    let newContacts = [];
    contacts.map((g, i) => {
      if (g.checked) {
        if (addedContacts.includes(g) === false) {
          newContacts.push(g.id);
          setAddedContacts((prevState) => prevState.concat([g]));
        }
      }
    });
    setAddContactsVisible(false);
    addContacts(newContacts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Send to</Text>
      <View style={styles.sendTo}>
        <RecipientAddItem
          title="Add Networks"
          onPress={() => {
            setAddNetworksVisible(true);
          }}
        />
        <RecipientAddItem
          title="Add Schools/Orgs"
          onPress={() => {
            setAddSchoolsVisible(true);
          }}
        />
        <RecipientAddItem
          title="Add Groups"
          onPress={() => {
            setAddGroupsVisible(true);
          }}
        />
        <RecipientAddItem
          title="Add Contacts"
          onPress={() => {
            setAddContactsVisible(true);
          }}
        />
        <RecipientAddItem
          title="Add Contacts by Student"
          separator={false}
          onPress={() => {
            setAddContactsByStudentVisible(true);
          }}
        />
      </View>

      <CheckListModalNewMessage
        filteredList={filteredDistricts}
        onSearch={onSearchDistricts}
        onSelectAll={onSelectAllDistricts}
        searchPlaceholder={"Search Networks"}
        selectAllListItems={selectAllDistrictsFlag}
        selectListItem={selectDistrict}
        showModal={setAddNetworksVisible}
        isModalVisible={addNetworksVisible}
        fetchMore={fetchMoreDistricts}
        onAdd={() => onAddUnits("districts")}
      />
      <CheckListModalNewMessage
        filteredList={filteredSchools}
        onSearch={onSearchSchools}
        onSelectAll={onSelectAllSchools}
        searchPlaceholder={"Search Schools"}
        selectAllListItems={selectAllSchoolsFlag}
        selectListItem={selectSchool}
        showModal={setAddSchoolsVisible}
        isModalVisible={addSchoolsVisible}
        fetchMore={fetchMoreSchools}
        onAdd={() => onAddUnits("schools")}
      />
      <CheckListModalNewMessage
        filteredList={filteredGroups}
        onSearch={onSearchGroups}
        onSelectAll={onSelectAllGroups}
        searchPlaceholder={"Search Groups"}
        selectAllListItems={selectAllGroupsFlag}
        selectListItem={selectGroup}
        showModal={setAddGroupsVisible}
        isModalVisible={addGroupsVisible}
        fetchMore={fetchMoreGroups}
        onAdd={() => onAddUnits("groups")}
      />
      <CheckListModalNewMessage
        filteredList={filteredContacts}
        onSearch={onSearchContacts}
        onSelectAll={onSelectAllContacts}
        searchPlaceholder={"Search Contacts"}
        selectAllListItems={selectAllContactsFlag}
        selectListItem={selectContact}
        showModal={setAddContactsVisible}
        isModalVisible={addContactsVisible}
        fetchMore={fetchMoreContacts}
        onAdd={() => onAddContacts()}
      />
      <CheckListModalNewMessage
        filteredList={filteredStudents}
        onSearch={onSearchStudents}
        onSelectAll={onSelectAllStudents}
        searchPlaceholder={"Search Contacts By Student"}
        selectAllListItems={selectAllStudentsFlag}
        selectListItem={selectStudentById}
        showModal={setAddContactsByStudentVisible}
        isModalVisible={addContactsByStudentVisible}
        fetchMore={fetchMoreStudents}
        onAdd={() => onAddContactsByStudents()}
      />
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  selectDistrict: (id) => dispatch(selectDistrict(id)),
  selectSchool: (id) => dispatch(selectSchool(id)),
  selectGroup: (id) => dispatch(selectGroup(id)),
  selectContact: (id) => dispatch(selectContactByID(id)),
  selectStudentById: (id) => dispatch(selectStudentById(id)),
  addUnits: (units) => dispatch(addUnits(units)),
  addContacts: (contacts) => dispatch(addContacts(contacts)),
  selectAllGroups: (flag) => dispatch(selectAllGroups(flag)),
  selectAllSchools: (flag) => dispatch(selectAllSchools(flag)),
  selectAllDistricts: (flag) => dispatch(selectAllDistricts(flag)),
  selectAllContacts: (flag) => dispatch(selectAllContacts(flag)),
  selectAllStudents: (flag) => dispatch(selectAllStudents(flag)),
});

const mapStateToProps = (state) => ({});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    color: colors.placeholderText,
    alignSelf: "flex-start",
  },
  sendTo: {
    width: "90%",
    height: 250,
    marginTop: 13,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessageRecipients);
