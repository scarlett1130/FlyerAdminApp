import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../constants/colors";
import { ModalCard } from "../ModalCard";
import FilterListing from "./FilterListing";

function FilterPicker({
  org,
  onSelectItem,
  selectedItem = "",
  showEmpty = false,
}) {
  const [showListing, setShowListing] = useState(false);
  let title = "";

  if (org == "g") title = "Groups";
  if (org == "d") title = "Districts";
  if (org == "s") title = "Schools";

  const onPickerPressed = () => {
    setShowListing(!showListing);
  };
  const onItemSelected = (item) => {
    onSelectItem(item);
    setShowListing(!showListing);
  };

  return (
    <>
      <TouchableOpacity onPress={() => onPickerPressed()}>
        <View style={styles.container}>
          <Text style={styles.text}>{selectedItem}</Text>
          <MaterialCommunityIcons
            name="chevron-down"
            size={25}
            color={colors.placeholderText}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <ModalCard
        title={title}
        visible={showListing}
        onPressClose={onPickerPressed}
        scrollable={false}
      >
        <FilterListing
          org={org}
          onSelectItem={(item) => onItemSelected(item)}
          showEmpty={showEmpty}
        />
      </ModalCard>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.textInputBg,
    borderRadius: 5,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
    left: 10,
  },
  text: {
    color: colors.placeholderText,
    fontSize: 16,
    fontFamily: "Lato-Regular",
  },
});

export default FilterPicker;
