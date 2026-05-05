import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/Input";
import { useFocusEffect } from "expo-router";
import { RTClient, useChatMessages, useUserStatus } from "@/app/rt_client/rt_client";
import TextMessage from "./components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";
import FloatingButton from "./components/FloatingButton";
import ScreenBackground from "@/components/ui/screen-background";
import Spacer from "@/components/ui/spacer";
import { FlashList } from "@shopify/flash-list";
import { useEditMode } from "./hooks";
import EditHeader from "./components/EditHeader";

export default function DirectChatScreen({ route }: any) {
  const { chatID } = route?.params;
  const [chat, setChat] = useState();
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);
  const messages = useChatMessages(chatID);
  const { isEditMode, enable, disable, toggle } = useEditMode(3);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function loadContent() {
        const chatData = await RTClient.getChat(chatID);
        if (isActive) setChat(chatData);
        await RTClient.setChatEntering(chatID, getCurrentUserID());
      };
      loadContent();
      return () => {
        isActive = false;
        RTClient.setChatLeaving(chatID, getCurrentUserID());
        console.log("Screen unfocused");
      };

    }, [chatID, messages?.length]));

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
          {isEditMode ? <EditHeader /> : <Header chatID={chat?.info?.chat_id} peer={chat?.peer} />}
          <FlashList
            onScroll={() => setFloatButtonVisible(true)}
            data={messages}
            keyExtractor={(item, _) => item?.message_id}
            renderItem={({ item }) => (
              <TextMessage chatID={chatID} message={item} />
            )}
            ListFooterComponent={<Spacer spacing={10} />}
            keyboardShouldPersistTaps="always"
            removeClippedSubviews
            inverted
          />
          <FloatingButton isVisible={isFloatButtonVisible} />
          <Input chatID={chatID} />
        </ScreenBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback >
  );
};

const styles = StyleSheet.create({

});