import React, { useCallback, useRef, useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, FlatList } from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/Input";
import { useFocusEffect } from "expo-router";
import { RTClient } from "@/app/rt_client/rt_client";
import { RTMessage } from "@/app/rt_client/models/models";
import TextMessage from "./components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";
import FloatingButton from "./components/FloatingButton";

export default function DirectChatScreen({ route }: any) {
  const chatID = route?.params?.chatID;

  const [chat, setChat] = useState();
  const [messages, setMessages] = useState<RTMessage[]>();
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);

  const flatListRef = useRef<FlatList>(null);
  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        setChat(await RTClient.getChat(chatID));
        setMessages(await RTClient.getChatMessages(chatID));
        setTimeout(() => {
          RTClient.setChatEntering(chatID, getCurrentUserID());
        },
        )

        return () => {
          console.log("Screen unfocused");
        }
        flatListRef.current?.scrollToOffset({ offset: 0 })
      }
      loadContent();
    }, []));

  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1 }}
      enabled={true}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ImageBackground
        style={{ flex: 1, justifyContent: "space-between" }}
        source={require("@/assets/images/background.png")}
      >
        <Header info={chat} />
        <KeyboardAvoidingView
        >
          <FlatList
            ref={flatListRef}
            onScroll={() => setFloatButtonVisible(true)}
            data={messages}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item }) => (
              <TextMessage message={item} />
            )}
            keyboardShouldPersistTaps="always"
            removeClippedSubviews
          />
        </KeyboardAvoidingView>
        <FloatingButton isVisible={isFloatButtonVisible} />
        <Input chatID={chatID} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = {
  view: {

  }
};