import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, ImageBackground, View, FlatList } from "react-native";
import BottomBar from "../bars/bottomBar";
import RecommendationCard, { RecommendedCard_T } from "./components/RecommendationCard";
import ChatCard from "./components/ChatCard";
import { textStyle } from "@/styles/textStyles";
import { GetUserFollowers } from "@/api/followers/followers";
import { GetUserRecommendations } from "@/api/recommendations/recommendations";
import { GetUserChats } from "@/api/chats/chats";
import { RTClient } from "../rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";
import { UserCard_T } from "../types/user";
import FriendCard from "./components/FriendCard";
import { GetSocial } from "./services/services";
import ScreenBackground from "@/components/ui/screen-background";

export default function SocialScreen() {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [friends, setFriends] = useState<UserCard_T[]>();
  const [recommendations, setRecommendatoins] = useState<RecommendedCard_T[]>();
  const [chats, setChats] = useState<any[]>();
  const [activity, setActivity] = useState<any[]>();

  useEffect(() => {
    async function loadContent() {
      await RTClient.setPageEntering("social", getCurrentUserID() ?? 1);

      const data = await GetSocial();
      setFriends(data?.friends);
      setRecommendatoins(data?.recommendations);
      setChats(data?.chats);
      /*setFriends(await GetUserFollowers(currentUserID));
      setRecommendatoins(await GetUserRecommendations(currentUserID))
      setChats(await GetUserChats(currentUserID))*/
    };

    loadContent();
  }, [])


  let data = null;
  switch (activeTab) {
    case "Friends": {
      data = friends;
      break;
    } case "Recommendations": {
      data = recommendations;
      break;
    } case "Activity": {
      data = activity;
      break;
    } case "Chats": {
      data = chats;
      break;
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground>
        <View style={styles.topBar.view}>
          {
            tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.topBar.buttons.view,
                  activeTab === tab
                  &&
                  styles.topBar.activeButton.view
                ]}
              >
                <Text style={textStyle.white18}>{tab}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <>
              {
                activeTab === "Friends" &&
                <FriendCard friend={item} />
              }
              {
                activeTab === "Recommendations" &&
                <RecommendationCard item={item} />
              }
              {
                activeTab === "Chats" &&
                <ChatCard item={item} />
              }
              {
                activeTab === "Activity" &&
                null
              }
            </>
          )
          } />
      </ScreenBackground>
      <BottomBar />
    </View>
  )
}

const styles = {
  topBar: {
    view: {
      height: 52,
      marginTop: "10%",
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
        paddingLeft: "2%",
        paddingRight: "2%",
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
