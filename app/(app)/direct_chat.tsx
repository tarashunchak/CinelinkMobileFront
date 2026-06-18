import React, { memo, useCallback, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
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
import { useBlurStore } from "@/src/components/ui/screen-background";
import { useEditMode } from "@/src/features/chats/hooks";
import EditHeader from "@/src/features/chats/components/EditHeader";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated from "react-native-reanimated";
import { MessagesManager, useChatMessages } from "@/src/rt_client/managers/messages_manager";
import { useChat } from "@/src/rt_client/managers/chats_manager";
import { ChatID } from "@/src/rt_client/models/models";

interface Params {
  chatID: number;
  imgUrl: string;
  name: string;
  peerID: number;
};

function onEndReachedO(chatID: ChatID){
 MessagesManager.getInstance().load(chatID);
};

function DirectChatScreen() {
  const { chatID, imgUrl, name, peerID } = useLocalSearchParams();
  const chat = useChat(chatID);
  const [isFloatButtonVisible, setFloatButtonVisible] = useState<boolean>(false);
  const { isEditMode, enable, disable, toggle } = useEditMode(3);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const setBottomBarVisible = useBlurStore((state) => state.setBottomBarVisible);
  const messages = useChatMessages(chatID);

  const onEndReached = useCallback(()=> onEndReachedO(chatID), [chatID]);

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
      console.warn("PeerID: ", peerID);

      return () => {
        isActive = false;
        RTClient.setChatLeaving(chatID, getCurrentUserID());
        console.log("Screen unfocused");
        setBottomBarVisible(true);
      };
    }, [chatID, setBottomBarVisible])
  );

  const ref = useRef<View | null>(null);
  const renderItem = useCallback(({ item }: any) => {
    if (item?.message_type === "text")
      return <TextMessage message={item} />
  }, [chatID]);

  return (
    <View style={StyleSheet.absoluteFill}>
      {isEditMode
        ? <EditHeader />
        :
        <Header
          chatID={chatID}
          peerID={peerID}
          imgUrl={imgUrl ?? chat?.info?.image}
          name={name}
          ref={ref}
        />
      }
      <KeyboardAvoidingView
        style={StyleSheet.absoluteFill}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        enabled={true}
      >
        <Animated.FlatList
          data={messages}
          scrollEventThrottle={16}
          style={StyleSheet.absoluteFill}
          keyExtractor={(item, index) => item.message_id ? `msg-${item.message_id}` : String(index)}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="always"
          inverted
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
        />
      </KeyboardAvoidingView>
      <Input chatID={chatID} />
    </View>
  );
};

export default memo(DirectChatScreen);

//onScrollBeginDrag={Keyboard.dismiss}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: hp(5),
    paddingBottom: hp(12),
  }
});