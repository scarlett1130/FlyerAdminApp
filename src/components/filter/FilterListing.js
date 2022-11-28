import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import colors from "../../constants/colors";
import { useGroups } from "../../hooks/fetch_filtered_groups_hook";
import { useDistricts } from "../../hooks/fetch_networks_hook";
import { useFilterSchoolsItems } from "../../hooks/fetch_filtered_schools_hook";
import ListItem from "../ListItem";
import { Screen } from "../Screen";
import SeparatorLine from "../SeparatorLine";

export default function FilterListing({
  org,
  onSelectItem,
  showEmpty = false,
}) {
  const loading = useSelector((state) => state.application.loading);
  let [data, fetchMore] = [];
  if (org == "d") [data, fetchMore] = useDistricts();
  if (org == "s") [data, fetchMore] = useFilterSchoolsItems();
  if (org == "g") [data, fetchMore] = useGroups();
  let emptyItem = {
    id: null,
    name: "--",
  };

  const renderItem = ({ item, index }) => {
    return (
      <>
        {!index && showEmpty && (
          <>
            <TouchableOpacity onPress={() => onSelectItem(emptyItem)}>
              <ListItem title={"--"} alignValue="center" />
            </TouchableOpacity>
            <SeparatorLine />
          </>
        )}
        <TouchableOpacity onPress={() => onSelectItem(item)}>
          <ListItem title={item.name} alignValue="center" />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Screen loading={loading}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.7}
        onEndReached={fetchMore}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={SeparatorLine}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "7%",
    borderRadius: 5,
    backgroundColor: colors.white,
    marginTop: 5,
    paddingBottom: 5,
  },
});
