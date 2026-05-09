import React, { useCallback, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/Input";
import { useFocusEffect } from "expo-router";
import { RTClient, useChatMessages } from "./../rt_client/rt_client";
import TextMessage from "./components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";
import FloatingButton from "./components/FloatingButton";
import ScreenBackground from "./../../components/ui/screen-background";
import Spacer from "./../../components/ui/screen-background";
import { useEditMode } from "./hooks";
import EditHeader from "./components/EditHeader";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useKeyboardAnimation, useKeyboardController } from "react-native-keyboard-controller";

export default function DirectChatScreen({ route }: any) {
  const { chatID } = route?.params;
  const [chat, setChat] = useState();
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);
  const messages = useChatMessages(chatID);
  const { isEditMode, enable, disable, toggle } = useEditMode(3);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const keyboard = useKeyboardAnimation();

  const animatedStyle = useAnimatedStyle(() => ({
    marginBottom: keyboard.height,
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

    }, [chatID, messages?.length]));

  const renderItem = useCallback(({ item }: any) => {
    if (item?.message_type === "text")
      return <TextMessage chatID={chatID} message={item} />
  }, [chatID]);


  return (
    <ScreenBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {isEditMode ? <EditHeader /> : <Header chatID={chat?.info?.chat_id} peer={chat?.peer} />}
        <Animated.FlatList
          data={messages}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => String(item.message_id)}
          renderItem={renderItem}
          estimatedItemSize={90}
          contentContainerStyle={{ paddingTop: heightPercentageToDP(10) }}
          keyboardShouldPersistTaps="always"
          inverted
        />
        <FloatingButton isVisible={isFloatButtonVisible} />
        <Animated.View style={[animatedStyle]}>
          <Input chatID={chatID} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
});