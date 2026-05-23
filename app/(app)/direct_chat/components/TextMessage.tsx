import React, { memo } from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import { isCurrentUser } from "@/utils/utils";
import { timestamp } from "../utils/utils";
import { textStyle } from "@/styles/textStyles";
import MessageContainer from "./MessageContainer";

interface TextMessage_I {
  message_id: number;
  user_id: number;
  chat_id: number;
  message: string;
  timestamp: string;
};

function TextMessage({ message }: { message: TextMessage_I  }) {
  return (
    <MessageContainer
      style={[
        styles.messageView,
        isCurrentUser(message?.user_id)
          ? styles.isCurrentUser
          : styles.notCurrentUser
      ]}
      isEditMode={false}
      isSelected={false}
    >
      <Text style={[textStyle.white16]}>
        {message?.message}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={require("../assets/checkGray.png")}
          style={styles.image}
        />
        <Text style={
          [
            textStyle.gray12,
            isCurrentUser(message?.user_id)
              ? styles.isCurrentUserTS
              : styles.notCurrentUserTS,
          ]}
        >
          {timestamp(new Date(message?.timestamp))}
        </Text>
      </View>
    </MessageContainer>
  );
};

export default memo(TextMessage);

const styles = StyleSheet.create({
  messageView: {
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    minHeight: 40,
    minWidth: "10%",
    maxWidth: "70%",
    margin: "2%",
    borderRadius: 8,
    padding: 5,
    flexDirection: "column",
    gap: 5,
  },
  isCurrentUser: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "flex-end",
  },
  notCurrentUser: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignSelf: "flex-start",
  },
  isCurrentUserTS: {
    alignSelf: "flex-start",
  },
  notCurrentUserTS: {
    alignSelf: "flex-end",
  },
  image: {
    width: 20,
    height: 20,
  },
});