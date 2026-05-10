import React, { useCallback, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  StyleSheet,
  Platform,
  View  // додайте
} from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/Input";
import { useFocusEffect } from "expo-router";
import { RTClient, useChatMessages } from "./../rt_client/rt_client";
import TextMessage from "./components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";
import FloatingButton from "./components/FloatingButton";
import ScreenBackground from "./../../components/ui/screen-background";
import { useEditMode } from "./hooks";
import EditHeader from "./components/EditHeader";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";

export default function DirectChatScreen({ route }: any) {
  const { height } = useAnimatedKeyboard();
  const { chatID } = route?.params;
  const [chat, setChat] = useState();
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);
  const messages = useChatMessages(chatID);
  const { isEditMode, enable, disable, toggle } = useEditMode(3);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -height.value }]
  }));

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
    }, [chatID])
  );

  const renderItem = useCallback(({ item }: any) => {
    if (item?.message_type === "text")
      return <TextMessage chatID={chatID} message={item} />
  }, [chatID]);

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        enabled={true}
      >
        {isEditMode
          ? <EditHeader />
          : <Header chatID={chat?.info?.chat_id} peer={chat?.peer} />
        }
        <FlatList
          data={messages}
          scrollEventThrottle={16}
          keyExtractor={(item) => String(item.message_id)}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingTop: heightPercentageToDP(10),
            paddingBottom: 10,
          }}
          keyboardShouldPersistTaps="always"
          onScrollBeginDrag={Keyboard.dismiss}
          inverted
        />

        <FloatingButton isVisible={isFloatButtonVisible} />

        {/* Input ТУТ, всередині KeyboardAvoidingView */}

      </KeyboardAvoidingView>
      <Animated.View style={[animatedStyle]}>
        <Input chatID={chatID} />
      </Animated.View>
    </ScreenBackground>
  );
};
