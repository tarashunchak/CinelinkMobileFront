import React from "react";
import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { isCurrentUser } from "@/utils/utils";
import { timestamp } from "../utils/utils";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";

interface TextMessage_I {
  message_id: number;
  sender_id: number;
  chat_id: number;
  content: {
    message: string;
  };
  timestamp: string;
};

export default function TextMessage({ message }: { message: TextMessage_I }) {
  return (
    <PressableScale
      style={[styles.messageView,
      isCurrentUser(message?.sender_id)
        ? styles.isCurrentUser
        : styles.notCurrentUser]}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }}
      delayLongPress={350}
    >
      <Text style={[textStyle.white16]}>
        {message?.content?.message}
      </Text>
      <Text style={[textStyle.gray12,
      isCurrentUser(message?.sender_id)
        ? styles.isCurrentUserTS
        : styles.notCurrentUserTS,
      ]}>
        {timestamp(new Date(message?.timestamp))}
      </Text>
    </PressableScale >
  );
};

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
});