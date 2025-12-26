import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, ImageBackground, ScrollView, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import SocialPageTopBar from "./components/topBar";
import FriendCard, { FriendCard_T } from "./components/friendCard";
import RecommendationCard, { RecommendedCard_T } from "./components/recommendationCard";
import ChatCard from "./components/chatCard";
import { textStyle } from "@/styles/textStyles";
import { GetUserFollowers } from "@/api/followers/followers";
import { CURRENT_USER } from "@/api/currentUser";
import { GetUserRecommendations } from "@/api/recommendations/recommendations";

export default function SocialScreen() {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState("Friends");
  const [friends, setFriends] = useState<FriendCard_T>();
  const [recommendations, setRecommendatoins] = useState<RecommendedCard_T>();

  useEffect(() => {
    async function loadFriendsCards() {
      const friendsData = await GetUserFollowers(CURRENT_USER.UID);
      const recommendationsData = await GetUserRecommendations(CURRENT_USER.UID);

      if (friendsData) setFriends(friendsData);
      if (recommendationsData) setRecommendatoins(recommendationsData);
      console.log("RECOMMENDATIONS: ", recommendationsData);
    };

    loadFriendsCards();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, paddingTop: "10%" }}>
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
          {[
            activeTab === "Friends" &&
            friends?.map((friend: FriendCard_T, index: number) =>
              (<FriendCard key={index} friend={friend} />))

            ,
            activeTab === "Recommendations" &&
            recommendations?.map((item: RecommendedCard_T, index: number) =>
              <RecommendationCard key={index} item={item} />)
          ]
          }

        </ScrollView>
      </ImageBackground >
      <BottomBar />
    </View>
  )
}

/*{activeTab === "Recommendations" && <RecommendationCard item={{}} />}
          {activeTab === "Activity" && <FriendCard friend={{}} />}
          {activeTab === "Chats" && <ChatCard />}*/

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