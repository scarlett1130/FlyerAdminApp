import React, { useRef, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useSelector, connect } from "react-redux";
import { AsyncStorage } from "react-native";

import ChatRoom from "../components/chat/ChatRoom";
import { Screen } from "../components/Screen";
import colors from "../constants/colors";
import RoundAddButton from "../components/RoundAddButton";
import CustomHeader from "../components/CustomHeader";
import { useChatItems } from "../hooks/fetch_chat_hook";
import { initChatThread, setCurrentConversation } from "../redux/actions/chat";

function ChatOverview(props) {
  const [conversations, fetch] = useChatItems();
  const loading = useSelector((state) => state.application.loading);
  const listRef = useRef();
  const mounted = useRef(false);

  useEffect(() => {
    AsyncStorage.setItem("unreadChatCounter", "0");

    const unsubscribe = props.navigation.addListener("focus", () => {
      fetch(true);
      listRef.current.scrollToOffset({ animated: true, offset: 0 });
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (mounted.current) {
      fetch(true);
      listRef.current.scrollToOffset({ animated: true, offset: 0 });
    } else {
      mounted.current = true;
    }
  }, [props.unitId, props.search_query]);

  const renderChatRoom = ({ item }) => {
    return <ChatRoom summary={item} onClick={() => onChatSummaryClick(item)} />;
  };

  const onChatSummaryClick = (item) => {
    const conversation = {
      title: item.unit.name,
      subtitle: `${item.recipient.first_name} ${item.recipient.last_name}`,
    };
    props.clearChatData();
    props.setConversation(conversation);
    props.navigation.navigate("Chat", { conID: item.id });
  };

  const onClick = () => props.navigation.navigate("NewChat");

  return (
    <Screen loading={loading}>
      <CustomHeader name="Chat" />
      <FlatList
        data={conversations}
        ref={listRef}
        renderItem={renderChatRoom}
        refreshing={loading}
        onEndReachedThreshold={0.7}
        onEndReached={() => fetch()}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={false}
      />
      <RoundAddButton onClick={onClick} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: colors.textInputBg,
  },
});

const mapDispatchToProps = (dispatch) => ({
  setConversation: (conversation) =>
    dispatch(setCurrentConversation(conversation)),
  clearChatData: () => dispatch(initChatThread()),
});

const mapStateToProps = (state) => ({
  unitId: state.conversations.filter_unitId,
  search_query: state.conversations.search_query,
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatOverview);
