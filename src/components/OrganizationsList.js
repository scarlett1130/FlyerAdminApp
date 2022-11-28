import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import colors from "../constants/colors";
import ListItem from "./ListItem";
import SeparatorLine from "./SeparatorLine";
import { Screen } from "./Screen";

import { useDistricts } from "../hooks/fetch_networks_hook";
import { useGroups } from "../hooks/fetch_groups_hook";
import { useSchoolsItems } from "../hooks/fetch_schools_hook";

export default function OrganizationsList(org) {
  const loading = useSelector((state) => state.application.loading);
  let [data, fetchMore] = [];
  if (org.org == "g") [data, fetchMore] = useGroups();
  if (org.org == "d") [data, fetchMore] = useDistricts();
  if (org.org == "s") [data, fetchMore] = useSchoolsItems();

  const renderItem = ({ item }) => {
    return <ListItem title={item.name} />;
  };

  return (
    <Screen
      loading={loading}
      backgroundColor={colors.textInputBg}
      paddingBottom={10}
    >
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
    marginTop: 20,
    paddingBottom: 20,
    overflow: "hidden",
  },
});
