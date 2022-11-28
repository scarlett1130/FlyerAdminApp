import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { connect } from "react-redux";

import colors from "../constants/colors";
import defaultStyles from "../constants/styles";
import AppTextInput from "./TextInput";
import FilterModal from "./filter/FilterModal";
import { setSearchQuery } from "../redux/actions/chat";

function CustomHeader({ name, setSearchQuery }) {
  const [searchClicked, setSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const onFilterIconPress = () => {
    setFilterModalVisible(!filterModalVisible);
  };
  const onFilterPress = () => {
    setFilterModalVisible(!filterModalVisible);
  };

  const onSearchPress = () => {
    setSearchClicked((prevClicked) => !prevClicked);
    searchClicked ? null : setSearchValue("");
    setSearchQuery(searchValue);
  };
  const onEndEditingSearch = () => {
    setSearchQuery(searchValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCompact}>
        <View style={styles.headerDesign}>
          <TouchableOpacity onPress={onFilterIconPress}>
            <Image
              source={require("../../assets/images/filter.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text numberOfLines={1} style={defaultStyles.headerText}>
            {name}
          </Text>
          <TouchableOpacity onPress={onSearchPress}>
            {searchClicked ? (
              <Image
                source={require("../../assets/images/closeButton.png")}
                style={styles.icon}
              />
            ) : (
              <Image
                source={require("../../assets/images/search.png")}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {searchClicked && (
        <View style={styles.headerExpansion}>
          <AppTextInput
            icon="magnify"
            value={searchValue}
            placeholder={"Search"}
            placeholderTextColor={colors.placeholderText}
            onChangeText={(text) => setSearchValue(text)}
            onEndEditing={() => onEndEditingSearch()}
            width="90%"
          />
        </View>
      )}
      <FilterModal
        onFilterIconPress={onFilterIconPress}
        filterModal={filterModalVisible}
        onFilterPress={onFilterPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  headerCompact: {
    backgroundColor: colors.primary,
    height: Platform.OS === "ios" ? 98 : 58 + Constants.statusBarHeight + 15,
    width: "100%",
  },
  headerDesign: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 47 : Constants.statusBarHeight + 30,
    marginHorizontal: 20,
  },
  headerExpansion: {
    backgroundColor: colors.primary,
    height: 72,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    height: 23,
    width: 23,
    alignItems: "center",
    tintColor: "#FAFAFA",
  },
});

const mapDispatchToProps = (dispatch) => ({
  setSearchQuery: (query) => dispatch(setSearchQuery(query)),
});

const mapStateToProps = (state) => ({
  search_query: state.conversations.search_query,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
