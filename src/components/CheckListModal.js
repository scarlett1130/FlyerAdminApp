import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import colors from "../constants/colors";
import { useSelector } from "react-redux";
import { ModalCard } from "./ModalCard";
import { Screen } from "./Screen";
import SeparatorLine from "./SeparatorLine";

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

export default function CheckListModal({
  title,
  isModalVisible,
  showModal,
  onSearch,
  filteredList,
  selectListItem,
  selectAllListItems,
  onSelectAll,
  searchPlaceholder,
  onAdd,
}) {
  const loading = useSelector((state) => state.application.loading);

  const renderItem = (item, i) => {
    return (
      <>
        {i === 0 ? (
          <View style={{ flex: 1 }}>
            <CheckBox
              checked={selectAllListItems}
              title={"Select All"}
              iconType={"font-awesome-5"}
              checkedIcon={CheckedIcon()}
              uncheckedIcon={UncheckedIcon()}
              containerStyle={{
                backgroundColor: "white",
                borderColor: "white",
                paddingHorizontal: 3,
              }}
              titleProps={{ style: styles.checkBoxText }}
              onPress={onSelectAll}
            />
            <View style={styles.sectionSeparatorFullWidth}>
              <View style={styles.separatorLine} />
            </View>
          </View>
        ) : null}
        <View>
          <CheckBox
            checked={item.checked}
            title={`${item.first_name} ${item.last_name}`}
            iconType={"material"}
            checkedIcon={CheckedIcon()}
            uncheckedIcon={UncheckedIcon()}
            containerStyle={{
              backgroundColor: "white",
              borderColor: "white",
              paddingHorizontal: 3,
            }}
            titleProps={{ style: styles.checkBoxText }}
            onPress={() => selectListItem(i)}
          />
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
          color="#CACACA"
        />
        <TextInput
          style={styles.input}
          placeholder={searchPlaceholder}
          onChangeText={(input) => onSearch(input)}
          underlineColorAndroid="transparent"
        />
      </View>
      <View
        style={{
          height: "70%",
        }}
      >
        <Screen loading={loading}>
          <FlatList
            data={filteredList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => renderItem(item, index)}
          />
        </Screen>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={() => onAdd()}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </ModalCard>
  );
}

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
    fontSize: 16,
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
});
