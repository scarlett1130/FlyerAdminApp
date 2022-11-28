import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { connect, useSelector } from "react-redux";

import NewsFeedItem from "../components/newsFeed/NewsFeedItem";
import { getNewsFeed } from "../redux/actions/newsFeed";
import { useFeedItems } from "../hooks/fetch_newsfeed_hook";
import { Screen } from "../components/Screen";
import colors from "../constants/colors";

function NewsFeed({ navigation }) {
  const [items, fetch] = useFeedItems();
  const loading = useSelector((state) => state.application.loading);

  function onNewsFeedItemClick(item) {
    return () => {
      navigation.navigate("NewsFeedDetails", { mesID: item.id, type: "news" });
    };
  }

  const renderFeedItem = ({ item }) => {
    return (
      <NewsFeedItem data={item} onClick={onNewsFeedItemClick(item.item)} />
    );
  };

  return (
    <Screen style={styles.mainContainer} loading={loading}>
      <FlatList
        refreshing={loading}
        data={items}
        renderItem={renderFeedItem}
        onEndReachedThreshold={0.7}
        onEndReached={fetch}
        keyExtractor={(item) => item.item.id.toString()}
        contentContainerStyle={styles.container}
        automaticallyAdjustContentInsets={false}
      />
    </Screen>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getNewsFeed: () => dispatch(getNewsFeed()),
});
const mapStateToProps = (state) => ({});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  container: {
    alignItems: "stretch",
    paddingLeft: "6%",
    paddingRight: "6%",
    paddingTop: "5%",
    paddingBottom: "5%",
    backgroundColor: colors.textInputBg,
  },
  title: {
    marginBottom: 100,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
