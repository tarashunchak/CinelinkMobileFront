import React from "react";
import { ImageBackground, FlatList, View, Text, Image, TouchableOpacity } from "react-native";
import Header from "./components/header";
import Input from "./components/input";

export default function ChatScreen() {
  return (
    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, justifyContent: "space-between" }}>
      <Header />

      <Input />
    </ImageBackground>
  );
};

const styles = {
  view: {

  }
};