import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CustomHeader from "../components/CustomHeader";
import colors from "../constants/colors";
import MessageRooms from "../components/messages/MessageRooms";

const Tab = createMaterialTopTabNavigator();
const Outbox = () => {
  return <MessageRooms type="Outbox" />;
};
const Draft = () => {
  return <MessageRooms type="Draft" />;
};
const Archive = () => {
  return <MessageRooms type="Archive" />;
};

export default function MessageOverview(props) {
  return (
    <>
      <CustomHeader name="Messages" />
      <Tab.Navigator
        initialRouteName="Outbox"
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
          style: { backgroundColor: colors.textInputBg, marginBottom: -5 },
        }}
      >
        <Tab.Screen name="Outbox" component={Outbox} />
        <Tab.Screen name="Draft" component={Draft} />
        <Tab.Screen name="Archive" component={Archive} />
      </Tab.Navigator>
    </>
  );
}

const win = Dimensions.get("window");
const indicatorWidth = win.width / 8;
