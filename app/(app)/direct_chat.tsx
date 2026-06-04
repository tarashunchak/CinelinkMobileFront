import React, { useCallback, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import Header from "@/src/features/chats/components/HeaderBlock";
import Input from "@/src/features/chats/components/Input";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { RTClient } from "@/src/rt_client/rt_client";
import TextMessage from "@/src/features/chats/components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";
import FloatingButton from "@/src/features/chats/components/FloatingButton";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { useEditMode } from "@/src/features/chats/hooks";
import EditHeader from "@/src/features/chats/components/EditHeader";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { MessagesManager, useChatMessages } from "@/src/rt_client/managers/messages_manager";
import { useChat } from "@/src/rt_client/managers/chats_manager";

export default function DirectChatScreen() {
  const { chatID, imgUrl, name, peerID } = useLocalSearchParams();
  const chat = useChat(chatID);
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);
  const { isEditMode, enable, disable, toggle } = useEditMode(3);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const setBottomBarVisible = useBlurStore((state) => state.setBottomBarVisible);
  const messages = useChatMessages(chatID);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setBottomBarVisible(false);
      async function loadContent() {
        //const chatData = useChat(chatID);
        if (isActive) false;
        await RTClient.setChatEntering(chatID, getCurrentUserID());
      };
      loadContent();
      console.warn("Chat: ", chat);

      return () => {
        isActive = false;
        RTClient.setChatLeaving(chatID, getCurrentUserID());
        console.log("Screen unfocused");
        setBottomBarVisible(true);
      };
    }, [chatID, setBottomBarVisible])
  );

  const renderItem = useCallback(({ item }: any) => {
    if (item?.message_type === "text")
      return <TextMessage message={item} />
  }, [chatID]);

  return (
    <View style={{ height: hp(100), width: wp(100) }}>
      <KeyboardAvoidingView
        style={StyleSheet.absoluteFill}
        behavior={"padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        enabled={true}
      >
        {isEditMode
          ? <EditHeader />
          :
          <Header
            chatID={chatID}
            peerID={peerID}
            imgUrl={imgUrl ?? chat?.info?.image}
            name={name}
          />
        }
        <FlatList
          data={messages}
          scrollEventThrottle={16}
          onScrollBeginDrag={Keyboard.dismiss}
          style={{ height: hp(100) }}
          keyExtractor={(item) => String(item.message_id)}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingTop: hp(8),
          }}
          keyboardShouldPersistTaps="always"
          inverted
          onEndReached={() => { MessagesManager.getInstance().load(chatID) }}
        />
      </KeyboardAvoidingView>
      <Input chatID={chatID} />
    </View>
  );
};
