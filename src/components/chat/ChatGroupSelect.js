import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { useDispatch } from "react-redux";
import colors from "../../constants/colors";
import FilterPicker from "../filter/FilterPicker";
import SeparatorLine from "../SeparatorLine";
import { setUnitId } from "../../redux/actions/chat";

export default function ChatGroupSelect(props) {
  const [selectedSch, setSelectedSch] = useState("--");
  const [selectedGrp, setSelectedGrp] = useState("--");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUnitId(""));
  }, []);

  const onSelectItemS = (item) => {
    setSelectedSch(item.name);
    dispatch(setUnitId(item && item.id ? item.id : ""));
  };
  const onSelectItemG = (item) => {
    setSelectedGrp(item.name);
    dispatch(setUnitId(item && item.id ? item.id : ""));
  };
  const onCheckboxSchool = () => {
    props.setValue(0);
    dispatch(setUnitId(""));
    setSelectedGrp("--");
  };
  const onCheckboxGroup = () => {
    props.setValue(1);
    dispatch(setUnitId(""));
    setSelectedSch("--");
  };

  return (
    <View style={styles.chatWith}>
      <Text style={styles.sectionTitle}>Chat With</Text>
      <View style={styles.chatSelection}>
        <CheckBox
          iconType="font-awesome-5"
          title="School"
          checkedIcon="dot-circle"
          uncheckedIcon="circle"
          checkedColor={colors.primary}
          uncheckedColor={colors.textInputBg}
          checked={props.value === 0}
          containerStyle={{
            backgroundColor: colors.white,
            borderColor: colors.white,
          }}
          onPress={onCheckboxSchool}
          titleProps={{ style: styles.checkBoxText }}
          fontFamily={"Lato-Regular"}
        />
        {props.value === 0 && (
          <View style={styles.pickerContainer}>
            <FilterPicker
              org="s"
              onSelectItem={onSelectItemS}
              selectedItem={selectedSch}
            />
          </View>
        )}
        <SeparatorLine />
        <CheckBox
          iconType="font-awesome-5"
          title="Group"
          checkedIcon="dot-circle"
          uncheckedIcon="circle"
          checkedColor={colors.primary}
          uncheckedColor={colors.textInputBg}
          checked={props.value === 1}
          containerStyle={{
            backgroundColor: colors.white,
            borderColor: colors.white,
          }}
          onPress={onCheckboxGroup}
          titleProps={{ style: styles.checkBoxText }}
        />
        {props.value === 1 && (
          <View style={styles.pickerContainer}>
            <FilterPicker
              org="g"
              onSelectItem={onSelectItemG}
              selectedItem={selectedGrp}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatWith: {
    width: "90%",
    minHeight: 190,
    marginTop: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.placeholderText,
    alignSelf: "flex-start",
  },
  chatSelection: {
    width: "100%",
    minHeight: 160,
    backgroundColor: colors.white,
    marginTop: 12,
    borderRadius: 5,
    paddingBottom: 12,
  },
  checkBoxText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.label,
    marginLeft: 13,
  },
  pickerContainer: {
    width: "90%",
    alignSelf: "center",
    top: -5,
    marginBottom: 5,
  },
});
