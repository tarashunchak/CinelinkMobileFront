import React, { useCallback, useState } from "react";
import { ImageBackground, ScrollView, View, KeyboardAvoidingView } from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/input";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import { getCurrentUserID } from "@/utils/utils";
import { RTClient } from "@/app/rt_client/rt_client";
import { RTMessage } from "@/app/rt_client/models/models";
import TextMessage from "./components/TextMessage";

export default function DirectChatScreen({ route }: any) {
  const chatID = route?.params?.chatID;

  const [chat, setChat] = useState();
  const [messages, setMessages] = useState<RTMessage[]>();
  const [online, setOnline] = useState();
  const [isTyping, setIsTyping] = useState();

  if (isTyping) console.warn("user_is typing");

  RTClient.setOnOnlineCallBack(1, () => {
    console.warn("User is online!!!!!!!!");
  })

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        setChat(await RTClient.getChat(chatID));
        setMessages(await RTClient.getChatMessages(chatID));
        RTClient.setOnTypingCallBack(getCurrentUserID(), setIsTyping);
        return () => {
          console.log("Screen unfocused");
        }
      }
      loadContent();
    }, []));

  return (
    <KeyboardAvoidingView style={{ flexGrow: 1 }} enabled={true} behavior="padding">
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, justifyContent: "space-between" }}>
        <Header info={chat} />
        <ScrollView style={{}}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}>
          {[
            messages?.map((item: any, index: number) => (
              <TextMessage message={item} />
            )),
            <View key={0} style={{ height: hp(8) }}></View>
          ]}

        </ScrollView>
        <Input chatID={chatID} />

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = {
  view: {

  }
};