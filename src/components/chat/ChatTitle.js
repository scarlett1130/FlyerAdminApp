import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import colors from "../../constants/colors";

const ChatTitle = ({ currentConversation }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    setTitle(currentConversation.title);
    setSubtitle(currentConversation.subtitle);
  }, [currentConversation]);
  return (
    <View>
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={1} style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => ({
  currentConversation: state.chat.currentConversation,
});

const mapDispatchToProps = (dispatch) => ({});

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontFamily: "Lato-Regular",
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 24,
    alignSelf: "center",
  },
  subtitle: {
    color: colors.textInputBg,
    fontFamily: "Lato-Regular",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    alignSelf: "center",
    top: 2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatTitle);
