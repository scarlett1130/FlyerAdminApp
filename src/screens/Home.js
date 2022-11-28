import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Platform,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Constants from "expo-constants";
import { getFocusedRouteNameFromRoute } from "@react-navigation/core";
import { useDispatch } from "react-redux";

import MessageOverview from "./MessageOverview";
import Chat from "./Chat";
import ChatOverview from "./ChatOverview";
import NewChat from "./NewChat";
import Settings from "./Settings";
import Organizations from "./Organizations";
import ChatTitle from "../components/chat/ChatTitle";
import colors from "../constants/colors";
import { useUnreadCounter } from "../hooks/unreadChatsHook";
import Message from "./Message";
import NewsFeed from "./NewsFeed";
import NewMessage from "./NewMessage";
import { registerDevice } from "../redux/actions/registerDevice";

const Stack = createStackNavigator();
const headerHeight =
  Platform.OS === "ios" ? 98 : 58 + Constants.statusBarHeight + 15;

function MessagesStack() {
  return (
    <Stack.Navigator
      initialRouteName="MessageMain"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.primary,
          height: headerHeight,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 20,
          fontFamily: "Lato-Regular",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="MessageOverview"
        component={MessageOverview}
        options={{ header: () => null }}
      />

      <Stack.Screen
        name="Message"
        component={Message}
        options={{ title: "Message" }}
      />

      <Stack.Screen
        name="NewMessage"
        component={NewMessage}
        options={{ title: "New Message" }}
      />
    </Stack.Navigator>
  );
}

function NewsFeedStack() {
  return (
    <Stack.Navigator
      initialRouteName="NewsFeed"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.primary,
          height: headerHeight,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 20,
          fontFamily: "Lato-Regular",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="NewsFeed"
        component={NewsFeed}
        options={{ title: "News Feed", headerLeft: null }}
      />
      <Stack.Screen
        name="NewsFeedDetails"
        component={Message}
        options={{ title: "Message" }}
      />
    </Stack.Navigator>
  );
}

function ChatStack() {
  return (
    <Stack.Navigator
      initialRouteName="ChatOverview"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.primary,
          height: headerHeight,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 20,
          fontFamily: "Lato-Regular",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="ChatOverview"
        component={ChatOverview}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerTitle: (props) => <ChatTitle {...props} /> }}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChat}
        options={{ title: "New Chat" }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: colors.primary,
          height: headerHeight,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: "normal",
          fontSize: 20,
          fontFamily: "Lato-Regular",
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ title: "Settings", headerLeft: null }}
      />
      <Stack.Screen
        name="Organizations"
        component={Organizations}
        options={{ title: "My Organizations" }}
      />
    </Stack.Navigator>
  );
}

const win = Dimensions.get("window");
const Tab = createBottomTabNavigator();

export default function Home(props) {
  const [unreadCounter, setUnreadCounter] = useUnreadCounter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(registerDevice(props.expoPushToken));
    /*if (accessToken && fcmToken) {
      //FIREBASE TODO
      
      AsyncStorage.getItem('unreadChatCounter', (error, counter) => {
        if (counter) setUnreadCounter(parseInt(counter, 10));
      });
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log("Remote received in background", remoteMessage);
        if (remoteMessage.chat_id) {
          AsyncStorage.getItem('unreadChatCounter', (error, counter) => {
            AsyncStorage.setItem('unreadChatCounter', (parseInt(counter, 10) + 1).toString());
          });
        }
      });
      messaging().onNotificationOpenedApp(remoteMessage => {
        navigation.navigate('Chat', { conID: remoteMessage.chat_id });
      });
      messaging().getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage && remoteMessage.chat_id) {
            navigation.navigate('Chat', { conID: remoteMessage.chat_id });
          }
        });
    }*/
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="ChatStack"
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.inactiveTabs,
        tabStyle: {
          height: 70,
          marginTop: 5,
        },
        style: {
          height: 65,
        },
      }}
    >
      {/*  <Tab.Screen
        name="Messages"
        component={MessagesStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/messagesTab.png")}
              style={[styles.messagesTabIcon, { tintColor: color }]}
              tintColor={color}
            />
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      />

      <Tab.Screen
        name="NewsFeed"
        component={NewsFeedStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/newsTab.png")}
              style={[styles.newsTabIcon, { tintColor: color }]}
              tintColor={color}
            />
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      /> */}

      <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <View>
              {unreadCounter > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeValue}>{unreadCounter}</Text>
                </View>
              ) : null}
              <Image
                source={require("../../assets/images/chatTab.png")}
                style={[styles.chatTabIcon, { tintColor: color }]}
                tintColor={color}
              />
            </View>
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => (
            <Image
              source={require("../../assets/images/settingsTab.png")}
              style={[styles.settingsTabIcon, { tintColor: color }]}
              tintColor={color}
            />
          ),
          tabBarVisible: getTabBarVisible(route),
        })}
      />
    </Tab.Navigator>
  );
}

const getTabBarVisible = (route) => {
  switch (getFocusedRouteNameFromRoute(route)) {
    case "Chat":
    case "NewChat":
    case "Organizations":
    case "Message":
    case "NewMessage":
    case "NewsFeedDetails":
      return false;
    default:
      return true;
  }
};

const styles = StyleSheet.create({
  chatTabIcon: {
    height: 28.98,
    width: 32.98,
  },
  badge: {
    minWidth: 22,
    height: 16,
    backgroundColor: colors.badge,
    borderRadius: 6.38,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 25,
    position: "absolute",
    bottom: 25,
  },
  badgeValue: {
    color: colors.white,
    fontFamily: "Lato-Bold",
    fontSize: 12,
  },
  settingsTabIcon: {
    height: 28.98,
    width: 28.04,
  },
  messagesTabIcon: {
    height: 28.98,
    width: 28.98,
  },
  newsTabIcon: {
    height: 28,
    width: 29,
  },
});
