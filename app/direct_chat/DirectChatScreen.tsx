import React, { useCallback, useState } from "react";
import { ImageBackground, ScrollView, View, KeyboardAvoidingView } from "react-native";
import Header from "./components/HeaderBlock";
import Input from "./components/Input";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import { RTClient } from "@/app/rt_client/rt_client";
import { RTMessage } from "@/app/rt_client/models/models";
import TextMessage from "./components/TextMessage";
import { getCurrentUserID } from "@/utils/utils";

export default function DirectChatScreen({ route }: any) {
  const chatID = route?.params?.chatID;

  const [chat, setChat] = useState();
  const [messages, setMessages] = useState<RTMessage[]>();

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
      }
      loadContent();
    }, []));

  return (
    <KeyboardAvoidingView style={{ flexGrow: 1 }} enabled={true} behavior="padding">
      <ImageBackground
        style={{ flex: 1, justifyContent: "space-between" }}
        source={require("@/assets/images/background.png")}
      >
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