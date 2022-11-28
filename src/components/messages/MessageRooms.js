import React, { useRef, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  useMessageItems,
  useMessageItemsArchived,
  useMessageItemsDraft,
} from "../../hooks/fetch_messages_hook";
import MessageGroupSummary from "./MessageGroupSummary";
import { getMessageOptions } from "../../redux/actions/message";
import colors from "../../constants/colors";
import { Screen } from "../Screen";
import RoundAddButton from "../RoundAddButton";

function MessageRooms({ type, unitId, search_query, getMessageOptions }) {
  let navigation = useNavigation();
  const loading = useSelector((state) => state.application.loading);
  const listRef = useRef();
  const mounted = useRef(false);

  let [data, fetchMore] = [];
  let status = "";
  if (type == "Outbox") {
    [data, fetchMore] = useMessageItems();
    status = "outbox";
  }
  if (type == "Draft") {
    [data, fetchMore] = useMessageItemsDraft();
    status = "draft";
  }
  if (type == "Archive") {
    [data, fetchMore] = useMessageItemsArchived();
    status = "archived";
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchMore(true);
      listRef.current.scrollToOffset({ animated: true, offset: 0 });
      getMessageOptions();
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (mounted.current) {
      fetchMore(true);
      listRef.current.scrollToOffset({ animated: true, offset: 0 });
    } else {
      mounted.current = true;
    }
  }, [unitId, search_query]);

  const renderMessageGroupSummary = ({ item }) => {
    return (
      <MessageGroupSummary
        data={item}
        onClick={() => onMessageSummaryClick(item)}
      />
    );
  };

  const onMessageSummaryClick = (item) =>
    navigation.navigate("Message", { mesID: item.id, status: { status } });
  const onAddNewClick = () => {
    navigation.navigate("NewMessage", { mode: "new", data: {} });
  };

  return (
    <Screen loading={loading}>
      {data ? (
        <FlatList
          ref={listRef}
          refreshing={loading}
          data={data}
          renderItem={renderMessageGroupSummary}
          onEndReachedThreshold={0.7}
          onEndReached={() => fetchMore()}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
        />
      ) : null}
      <RoundAddButton onClick={onAddNewClick} />
    </Screen>
  );
}

const mapDispatchToPropsMessages = (dispatch) => ({
  getMessageOptions: () => dispatch(getMessageOptions()),
});

const mapStateToPropsMessages = (state) => ({
  items: state.message.items,
  unitId: state.conversations.filter_unitId,
  search_query: state.conversations.search_query,
});

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: colors.textInputBg,
  },
});
export default connect(
  mapStateToPropsMessages,
  mapDispatchToPropsMessages
)(MessageRooms);
