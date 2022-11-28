import React, { useState, useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { useFonts } from "@use-expo/font";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import { navigationRef } from "./src/common/RootNavigation";
import { Screen } from "./src/components/Screen";
import { initialiseApplication } from "./src/redux/actions/application";
import { userLogin } from "./src/redux/actions/login";
import { isExpired } from "./src/common/expiration";
import store from "./src/redux/store";
import { FETCH_CONVERSATIONS_FAILURE } from "./src/redux/actions/chat";

const Stack = createStackNavigator();

const RootNavigator = ({ initialRoute, expoPushToken }) => {
  const HomeScreen = (props) => {
    return <Home {...props} expoPushToken={expoPushToken} />;
  };
  const LoginScreen = (props) => {
    return <Login {...props} expoPushToken={expoPushToken} />;
  };

  return (
    <Stack.Navigator initialRouteName={initialRoute} headerMode="none">
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      console.log("enter");
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await (await Notifications.getDevicePushTokenAsync()).data;
    console.log("token", token);
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      showBadge: true,
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FE9018",
    });
  }

  return token;
}

export default function App() {
  const [sessionExist, setSessionExist] = useState(false);
  const [storeData, setStoreDate] = useState();
  const [storeLoading, setStoreLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isLoaded] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
          const {
          notification: {
            request: {
              content: {
                data: { response },
              },
            },
          },
        } = response;
        //when the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
        console.log('>>>',I

        
        navigationRef.current?.navigate("Chat", { conID: conversation_id });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // SplashScreen.hide();
    validateSession();
  }, []);

  const validateSession = () => {
    try {
      AsyncStorage.getItem("loginData", (err, value) => {
        if (value !== null) {
          if (isExpired(JSON.parse(value).data.expires_in)) {
            setSessionExist(false);
          } else {
            setSessionExist(true);
            setStoreDate(JSON.parse(value));
          }
        }
        setStoreLoading(false);
      });
    } catch (error) {
      Alert.alert("Oops", error.message);
      setStoreLoading(false);
    }
  };

  if (storeLoading) {
    return null;
  }

  if (sessionExist) {
    store.dispatch(userLogin(storeData));
  } else {
    store.dispatch(initialiseApplication());
  }

  if (!isLoaded) {
    return <Screen loading={true} />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator
            initialRoute={sessionExist ? "HomeScreen" : "LoginScreen"}
            expoPushToken={expoPushToken}
          />
        </NavigationContainer>
      </Provider>
    );
  }
}
