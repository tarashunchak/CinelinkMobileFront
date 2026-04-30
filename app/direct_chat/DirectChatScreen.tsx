import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, FlatList, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/Input";
import { useFocusEffect } from "expo-router";
import { RTClient } from "@/app/rt_client/rt_client";
import { RTMessage } from "@/app/rt_client/models/models";
import TextMessage from "./components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";
import FloatingButton from "./components/FloatingButton";
import ScreenBackground from "@/components/ui/screen-background";
import Spacer from "@/components/ui/spacer";

export default function DirectChatScreen({ route }: any) {
  const { chatID } = route?.params;
  const [chat, setChat] = useState();
  const [messages, setMessages] = useState<RTMessage[]>();
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        setChat(await RTClient.getChat(chatID));
        setMessages(await RTClient.getChatMessages(chatID));
        setTimeout(async () => {
          await RTClient.setChatEntering(chatID, getCurrentUserID());
        }, 1000);
        return () => {
          console.log("Screen unfocused");
        };
      };
      loadContent();
    }, []));

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScreenBackground>
          <Header chatID={chat?.info?.chat_id} peer={chat?.peer} />
          <FlatList
            onScroll={() => setFloatButtonVisible(true)}
            data={messages?.reverse()}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => (
              <TextMessage chatID={chatID} message={item} />
            )}
            ListFooterComponent={<Spacer spacing={8} />}
            keyboardShouldPersistTaps="always"
            removeClippedSubviews
            inverted
          />
          <FloatingButton isVisible={isFloatButtonVisible} />
          <Input chatID={chatID} />
        </ScreenBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  view: {

  }
});