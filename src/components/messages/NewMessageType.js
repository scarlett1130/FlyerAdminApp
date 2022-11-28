import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { CheckBox, Icon } from "react-native-elements";
import { connect } from "react-redux";

import {
  addMessageOption,
  removeMessageOption,
} from "../../redux/actions/message";
import colors from "../../constants/colors";
import SeparatorLine from "../SeparatorLine";

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

function NewMessageType({ options, newMessage, addOption, removeOption }) {
  const checkOption = (option) => {
    // if the option is already checked, uncheck
    if (newMessage.message_options.indexOf(option.key) > -1) {
      removeOption(option.key);
    } else {
      // else, check
      addOption(option.key);
    }
  };

  const optionChecked = (option) => {
    if (newMessage.message_options.indexOf(option.key) > -1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Text style={styles.sectionTitle}>Send as</Text>
      <View style={styles.optionsContainer}>
        {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <View style={styles.sendAsRow}>
              <CheckBox
                checked={optionChecked(option)}
                title={option.value}
                iconType={"material"}
                checkedIcon={CheckedIcon()}
                uncheckedIcon={UncheckedIcon()}
                containerStyle={{
                  backgroundColor: colors.white,
                  borderColor: colors.white,
                  paddingHorizontal: 3,
                  height: 46,
                }}
                titleProps={{ style: styles.checkBoxText }}
                onPress={() => checkOption(option)}
              />
              <SeparatorLine />
            </View>
          ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    marginLeft: 20,
    marginTop: 20,
    color: colors.placeholderText,
    alignSelf: "flex-start",
  },
  optionsContainer: {
    width: "90%",
    marginTop: 13,
    backgroundColor: colors.white,
    borderRadius: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  sendAsRow: {
    marginTop: -5,
  },
  checkBoxText: {
    fontFamily: "Lato-Regular",
    fontSize: 16,
    color: colors.label,
    marginLeft: 13,
  },
});

const mapStateToProps = (state) => ({
  options: state.message.options,
  newMessage: state.message.newMessage,
});
const mapDispatchToProps = (dispatch) => ({
  addOption: (key) => dispatch(addMessageOption(key)),
  removeOption: (key) => dispatch(removeMessageOption(key)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewMessageType);
