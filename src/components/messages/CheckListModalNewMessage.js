import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  FlatList,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";

import { ModalCard } from "../ModalCard";
import SeparatorLine from "../SeparatorLine";
import { Screen } from "../Screen";

const UncheckedIcon = () => (
  <Icon
    name="square"
    type="font-awesome-5"
    color={colors.textInputBg}
    solid
    size={30}
  />
);

const CheckedIcon = () => (
  <Icon name="done" type="material" color={colors.primary} size={30} />
);

export default function CheckListModalNewMessage({
  title = "Send to",
  isModalVisible,
  showModal,
  onSearch,
  filteredList,
  selectListItem,
  selectAllListItems,
  onSelectAll,
  searchPlaceholder,
  onAdd,
  fetchMore,
}) {
  const loading = useSelector((state) => state.application.loading);

  const renderItem = (item, i) => {
    let isContacts = searchPlaceholder === "Search Contacts";
    let isStudents = searchPlaceholder === "Search Contacts By Student";
    let colorEmailContacts =
      isContacts && item.email !== "" ? colors.primary : colors.inactiveTabs;
    let colorPhoneContacts =
      isContacts && item.phone_number !== ""
        ? colors.primary
        : colors.inactiveTabs;
    let colorEmailStudents =
      isStudents &&
      item.contacts &&
      item.contacts[0] &&
      item.contacts[0].email !== ""
        ? colors.primary
        : colors.inactiveTabs;
    let colorPhoneStudents =
      isStudents &&
      item.contacts &&
      item.contacts[0] &&
      item.contacts[0].phone_number !== ""
        ? colors.primary
        : colors.inactiveTabs;
    let colorEmail = isStudents ? colorEmailStudents : colorEmailContacts;
    let colorPhone = isStudents ? colorPhoneStudents : colorPhoneContacts;

    return (
      <>
        {i === 0 ? (
          <View style={{ flex: 1, height: 50, marginBottom: 7 }}>
            <CheckBox
              checked={selectAllListItems}
              title={"Select All"}
              iconType={"font-awesome-5"}
              checkedIcon={CheckedIcon()}
              uncheckedIcon={UncheckedIcon()}
              containerStyle={{
                backgroundColor: colors.white,
                borderColor: colors.white,
                paddingHorizontal: 3,
              }}
              titleProps={{ style: styles.checkBoxText }}
              onPress={onSelectAll}
            />
            <SeparatorLine />
          </View>
        ) : null}
        <View>
          {isContacts || isStudents ? (
            <View style={styles.rowContainer}>
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  checked={item.checked}
                  title={
                    <View>
                      <Text
                        style={styles.checkBoxText}
                        numberOfLines={1}
                      >{`${item.first_name} ${item.last_name}`}</Text>
                      {isStudents ? (
                        <Text
                          style={styles.checkboxSecondLine}
                          numberOfLines={1}
                        >
                          {item.contacts && item.contacts[0]
                            ? "Contact: " +
                              item.contacts[0].first_name +
                              " " +
                              item.contacts[0].last_name
                            : ""}
                        </Text>
                      ) : null}
                    </View>
                  }
                  iconType={"material"}
                  checkedIcon={CheckedIcon()}
                  uncheckedIcon={UncheckedIcon()}
                  containerStyle={{
                    backgroundColor: colors.white,
                    borderColor: colors.white,
                    paddingHorizontal: 3,
                  }}
                  titleProps={{ style: styles.checkBoxText }}
                  onPress={() => selectListItem(item.id)}
                />
              </View>
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../../assets/images/emailLogin.png")}
                  style={styles.emailImage}
                  tintColor={colorEmail}
                />
                <Image
                  source={require("../../../assets/images/locked.png")}
                  style={styles.lockedImage}
                  tintColor={colorPhone}
                />
              </View>
            </View>
          ) : (
            <View style={styles.rowContainer}>
              <CheckBox
                checked={item.checked}
                title={
                  <View>
                    <Text style={styles.checkBoxText}>{`${item.name}`}</Text>
                  </View>
                }
                iconType={"material"}
                checkedIcon={CheckedIcon()}
                uncheckedIcon={UncheckedIcon()}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.white,
                  paddingHorizontal: 3,
                }}
                titleProps={{ style: styles.checkBoxText }}
                onPress={() => selectListItem(item.id)}
              />
            </View>
          )}
          <SeparatorLine />
        </View>
      </>
    );
  };

  return (
    <ModalCard
      visible={isModalVisible}
      title={title}
      onPressClose={showModal}
      scrollable={false}
    >
      <View style={styles.searchSection}>
        <Icon
          style={styles.searchIcon}
          name="search"
          type="material"
          size={30}
          color={colors.inactiveTabs}
        />
        <TextInput
          style={styles.input}
          placeholder={searchPlaceholder}
          onChangeText={(input) => onSearch(input)}
          underlineColorAndroid="transparent"
        />
      </View>
      <Screen loading={loading}>
        <FlatList
          data={filteredList}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.7}
        />
      </Screen>
      <TouchableOpacity style={styles.addBtn} onPress={() => onAdd()}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </ModalCard>
  );
}

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.textInputBg,
    borderRadius: 5,
    marginVertical: 12,
    paddingRight: 10,
    maxHeight: 50,
  },
  rowContainer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emailImage: {
    height: 11,
    width: 18,
    marginLeft: 15,
    marginTop: "7%",
    marginBottom: "7%",
    alignSelf: "center",
  },
  lockedImage: {
    height: 15,
    width: 11,
    marginLeft: 10,
    marginRight: 10,
    marginTop: "7%",
    marginBottom: "7%",
    alignSelf: "center",
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    color: colors.placeholderText,
    paddingRight: 30,
    fontFamily: "Lato-Regular",
    fontSize: 16,
  },

  checkBoxText: {
    fontFamily: "Lato-Regular",
    fontSize: 15,
    color: colors.label,
    marginLeft: 13,
  },
  addBtn: {
    height: 40,
    width: "40%",
    borderRadius: 5,
    backgroundColor: colors.primary,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 17,
  },
  addText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 19,
  },
  checkboxSecondLine: {
    fontFamily: "Lato-Regular",
    fontSize: 12,
    color: colors.placeholderText,
    marginLeft: 13,
  },
  checkBoxWrapper: {
    width: "70%",
  },
});
