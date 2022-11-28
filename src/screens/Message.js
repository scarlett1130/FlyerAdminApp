import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { connect, useSelector } from "react-redux";

import MessageContent from "../components/messages/MessageContent";
import MessageHeader from "../components/messages/MessageHeader";
import {
  getMessage,
  clearMessageDetails,
  archiveMessage,
} from "../redux/actions/message";
import { Screen } from "../components/Screen";
import MessageOptions from "../components/messages/MessageOptions";

function Message({
  route,
  getMessage,
  clearMessageDetails,
  data,
  attachment,
  archiveMessage,
  navigation,
}) {
  const { mesID, status, type } = route.params;
  const loading = useSelector((state) => state.application.loading);
  useEffect(() => {
    navigation.addListener("blur", () => {
      clearMessageDetails();
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getMessage(mesID);
    });
  }, [navigation]);
  const onEditPress = () => {
    navigation.navigate("NewMessage", {
      mode: "edit",
      data: { ...data, attachment: { name: attachment[0] } },
    });
  };
  const onCopyPress = () => {
    navigation.navigate("NewMessage", {
      mode: "copy",
      data: { ...data, attachment: { name: attachment[0] } },
    });
  };

  const onArchivePress = () => {
    status.status === "archived"
      ? archiveMessage(mesID, "restore")
      : archiveMessage(mesID, "archive");
    navigation.navigate("Outbox");
  };

  return (
    <Screen loading={loading}>
      <View style={styles.container}>
        {data && (
          <>
            <MessageHeader data={data} type={type} />
            <MessageContent data={data} attachment={attachment} />
            {type === "news" ? null : (
              <MessageOptions
                status={status}
                onEdit={onEditPress}
                onCopy={onCopyPress}
                onArchive={onArchivePress}
              />
            )}
          </>
        )}
      </View>
    </Screen>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getMessage: (messageId) => dispatch(getMessage(messageId)),
  clearMessageDetails: () => dispatch(clearMessageDetails()),
  archiveMessage: (messageId, name) =>
    dispatch(archiveMessage(messageId, name)),
});

const mapStateToProps = (state) => ({
  data: state.message.item,
  attachment: state.message.item_attach,
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 20,
    marginHorizontal: 15,
    marginBottom: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
