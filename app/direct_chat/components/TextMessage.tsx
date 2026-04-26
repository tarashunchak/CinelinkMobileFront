import React from "react";
import * as Haptics from "expo-haptics";
import { Image, View, StyleSheet, Text } from "react-native";
import { isCurrentUser } from "@/utils/utils";
import { timestamp } from "../utils/utils";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { ActionSheet } from "./ActionSheet";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { RemoveMessage } from "@/api/messages";

interface TextMessage_I {
  message_id: number;
  user_id: number;
  chat_id: number;
  content: {
    message: string;
  };
  timestamp: string;
};

export default function TextMessage({ message, chatID }: { message: TextMessage_I, chatID: number }) {
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <PressableScale
      style={[styles.messageView,
      isCurrentUser(message?.user_id)
        ? styles.isCurrentUser
        : styles.notCurrentUser]}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        const options = ['Видалити для всіх', 'Видалити у мене', 'Скасувати'];
        const destructiveButtonIndex = 0; // Перша кнопка буде червоною
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
          options,
          cancelButtonIndex,
          destructiveButtonIndex,
          title: 'Видалити повідомлення?',
          userInterfaceStyle: "dark",
        }, (selectedIndex?: number) => {
          switch (selectedIndex) {
            case 0:
              // Виклик твого методу:
              // RTClient.deleteMessage(message.chat_id, message.message_id, true)
              RemoveMessage(chatID, message?.message_id);
              break;
            case 1:
              // Видалити локально
              break;
          }
        });
      }}
      delayLongPress={350}
    >
      <Text style={[textStyle.white16]}>
        {message?.content?.message}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Image
          source={require("../assets/checkGray.png")}
          style={{ width: 20, height: 20 }}
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