import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../constants/colors";
import OrganizationsList from "../components/OrganizationsList";

const Tab = createMaterialTopTabNavigator();
const orgNetworks = () => {
  return <OrganizationsList org="d" />;
};
const orgSchools = () => {
  return <OrganizationsList org="s" />;
};
const orgGroups = () => {
  return <OrganizationsList org="g" />;
};

export default function Organizations(props) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {},
        activeTintColor: colors.primary,
        inactiveTintColor: colors.placeholderText,
        labelStyle: {
          fontSize: 16,
          textTransform: "capitalize",
          fontFamily: "Lato-Regular",
        },
        indicatorStyle: {
          width: 30,
          marginHorizontal: indicatorWidth,
          backgroundColor: colors.primary,
        },
        style: {
          backgroundColor: colors.textInputBg,
          marginBottom: -5,
        },
      }}
    >
      <Tab.Screen name="Networks" component={orgNetworks} />
      <Tab.Screen name="Schools/Orgs" component={orgSchools} />
      <Tab.Screen name="Groups" component={orgGroups} />
    </Tab.Navigator>
  );
}

const win = Dimensions.get("window");
const indicatorWidth = win.width / 8;

const styles = StyleSheet.create({
  container: {},
});
