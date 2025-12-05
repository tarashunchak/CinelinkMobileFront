import React, { useState } from "react";
import { TouchableOpacity, Text, ImageBackground, ScrollView, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import SocialPageTopBar from "./components/topBar";
import FriendCard from "./components/friendCard";
import RecommendationCard from "./components/recommendationCard";
import { RecommendedMovie } from "./components/recommendationCard";
import ChatCard from "./components/chatCard";
import { getActiveTab } from "./components/topBar";
import { textStyle } from "@/styles/textStyles";

export default function SocialScreen() {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState("Friends");

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, padding: "1%", paddingTop: "10%" }}>
        <View style={styles.topBar.view}>
          {
            tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.topBar.buttons.view,
                  activeTab === tab && styles.topBar.activeButton.view
                ]}
              >
                <Text style={textStyle.white18}>{tab}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <ScrollView style={{ padding: "1%" }}>
          {activeTab === "Friends" && <FriendCard friend={{}} />}
          {activeTab === "Recommendations" && <RecommendationCard item={{}} />}
          {activeTab === "Activity" && <FriendCard friend={{}} />}
          {activeTab === "Chats" && <ChatCard />}
        </ScrollView>
      </ImageBackground >
      <BottomBar />
    </View>
  )
}

const styles = {
  topBar: {
    view: {
      height: 52,
      marginBottom: "5%",
      width: "100%",
      alignSelf: "center",
      borderWidth: 0.5,
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 6,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1%",
    },
    buttons: {
      view: {
        paddingLeft: "2.5%",
        paddingRight: "2.5%",
        height: "98%",
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        color: "white",
        fontSize: 18,
      }
    },
    activeButton: {
      view: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 4,
        borderWidth: 0.5,
      }
    },
  }
}