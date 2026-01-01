import React, { useCallback, useState } from "react";
import { ImageBackground, ScrollView, FlatList, View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Header from "./components/header";
import Input from "./components/input";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useFocusEffect } from "expo-router";
import { GetChat } from "@/api/chats/chats";

export default function ChatScreen({ chatID }: { chatID: number }) {
  const [chat, setChat] = useState();

  useFocusEffect(
    useCallback(() => {
      async function loadContent() {
        const data = await GetChat(chatID);
        if (data) setChat(data);
      };

      loadContent();
    }, [])
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled={true} behavior="padding">
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, justifyContent: "space-between" }}>
        <Header info={chat} />
        <ScrollView style={{}} contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}>
          <Input />
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = {
  view: {

  }
};