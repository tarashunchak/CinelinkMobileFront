import React from "react";
import { ImageBackground, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import SocialPageTopBar from "./components/topBar";
import FriendCard from "./components/friendCard";
import RecommendationCard from "./components/recommendationCard";

export default function SocialScreen() {

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, padding: "2%", paddingTop: "10%" }}>
        <SocialPageTopBar />
        <RecommendationCard />
      </ImageBackground >
      <BottomBar />
    </View>
  )
}