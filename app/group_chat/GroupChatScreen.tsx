import React, { useCallback, useState } from "react";
import { ImageBackground, ScrollView, FlatList, View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Header from "./components/header";
import Input from "./components/input";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import { GetChat, GetChatMessages } from "@/api/chats/chats";
import { textStyle } from "@/styles/textStyles";
import { SendChatMessages } from "@/api/chats/messages";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { isCurrentUser } from "@/utils/utils";
import { RTChat } from "../rt_client/rt_client";



export default function GroupChatScreen({ chat }: { chat: any }) {

  return (
    <KeyboardAvoidingView style={{ flexGrow: 1 }} enabled={true} behavior="padding">
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, justifyContent: "space-between" }}>
        <Header info={chat} />
        <ScrollView style={{}}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{ flexGrow: 1 }}>
          {[
            messages?.map((item: any, index: number) => (
              <View key={index}
                style={{
                  backgroundColor: !isCurrentUser(item?.sender_id) ? "rgba(0, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  borderWidth: 0.5,
                  minHeight: 40,
                  minWidth: "10%",
                  maxWidth: "70%",
                  margin: "2%",
                  borderRadius: 8,
                  padding: 5,
                  alignSelf: isCurrentUser(item?.sender_id) ? "flex-end" : "flex-start",
                  flexDirection: "column",
                  gap: 5,
                }}>
                <Text
                  style={[textStyle.white16,
                  {

                  }]}
                >
                  {item?.content?.message}
                </Text>
                <Text key={index}
                  style={[textStyle.gray12,
                  {
                  }]}
                >
                  {timestamp(new Date(item?.timestamp))}
                </Text>
              </View>
            )),
            <View key={0} style={{ height: hp(8) }}></View>
          ]}

        </ScrollView>
        <Input sendMessage={(text: any) => RTChat.sendMessage(chatID, text)/*async (text: string) => {
          const res = await SendChatMessages({
            chat_id: chat?.chat_id,
            sender_id: useAuthStore.getState()?.user?.user_id,
            content: {
              message_type: "text",
              message: text
            }
          });
          if (res) await loadMessages();
        }*/} />

      </ImageBackground>
    </KeyboardAvoidingView>
  );
};