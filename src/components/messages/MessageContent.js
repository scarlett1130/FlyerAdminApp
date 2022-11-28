import React from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import colors from "../../constants/colors";
import HTML from "react-native-render-html";
import Pill from "../Pill";

export default function MessageContent({ data, attachment }) {
  const source = {
    html: `<span style="color:#9D9D9D;font-family:Lato-Regular;font-size:14px;margin-top:3px;margin-left:0px;">${data.body}</span>`,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.messageTitle}>{data ? data.title : ""}</Text>
      {data && data.body ? (
        <HTML
          ignoredStyles={["fontFamily"]}
          source={source}
          contentWidth={220}
        />
      ) : null}

      {attachment && attachment.length !== 0 && attachment[0] !== "" ? (
        <View style={styles.pillContainer}>
          <Pill
            openAttachment={() =>
              Linking.openURL(AttachmentsUrl + attachment[0])
            }
            label={attachment[0]}
            iconLeft={true}
            icon={"attachment"}
            style={styles.attachmentPill}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "7%",
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
    lineHeight: 18,
    height: win.height / 1.6,
    width: "100%",
    backgroundColor: colors.white,
    marginBottom: 10,
  },
  messageTitle: {
    color: colors.label,
    fontFamily: "Lato-Regular",
    fontSize: 16,
    lineHeight: 19,
    alignSelf: "flex-start",
    paddingBottom: 12,
  },
  pillContainer: {
    width: 175,
    marginTop: 20,
    paddingBottom: 20,
  },
  attachmentPill: {
    marginTop: 10,
  },
});
