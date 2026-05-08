import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import BottomBar from "../bars/bottomBar";
import { RecommendedCard_T } from "./components/RecommendationsList";
import ChatsList from "./components/DirectChatsList";
import { RTClient } from "../rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";
import { UserCard_T } from "../types/user";
import FriendsList from "./components/FriendsList";
import { GetSocial } from "./services/services";
import ScreenBackground from "@/components/ui/screen-background";
import SocialPageTopBar from "./components/topBar";
import Spacer from "@/components/ui/spacer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RecommendationsList from "./components/RecommendationsList";

export default function SocialScreen() {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [friends, setFriends] = useState<UserCard_T[]>(Array.from({ length: 8 }));
  const [recommendations, setRecommendatoins] = useState<RecommendedCard_T[]>([]);
  const [chats, setChats] = useState<any[]>(Array.from({ length: 8 }));
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    async function loadContent() {
      await RTClient.setPageEntering("social", getCurrentUserID());

      const data = await GetSocial();
      if (data) {
        setFriends(data?.friends);
        setRecommendatoins(data?.recommendations);
        setChats(data?.chats);
      }
    };

    loadContent();
  }, []);

  const renderList = useCallback(() => {
    switch (activeTab) {
      case "Friends":
        return <FriendsList friends={friends} />
      case "Recommendations":
        return <RecommendationsList items={recommendations} />
      case "Activity":
        return null;
      case "Chats":
        return <ChatsList chats={chats} />;
    }
  }, [activeTab, friends, chats, recommendations, activity]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground>
        <Spacer orientation="v" spacing={hp(5)} />
        <SocialPageTopBar onTabChange={(tab: string) => setActiveTab(tab)} />
        {renderList()}
      </ScreenBackground>
      <BottomBar />
    </View>
  );
};