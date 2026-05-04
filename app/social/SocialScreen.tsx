import React, { useState, useEffect, useMemo } from "react";
import { View, FlatList } from "react-native";
import BottomBar from "../bars/bottomBar";
import RecommendationCard, { RecommendedCard_T } from "./components/RecommendationCard";
import ChatCard from "./components/ChatCard";
import { RTClient } from "../rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";
import { UserCard_T } from "../types/user";
import FriendCard from "./components/FriendCard";
import { GetSocial } from "./services/services";
import ScreenBackground from "@/components/ui/screen-background";
import SocialPageTopBar from "./components/topBar";
import Spacer from "@/components/ui/spacer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function SocialScreen() {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [friends, setFriends] = useState<UserCard_T[]>([]);
  const [recommendations, setRecommendatoins] = useState<RecommendedCard_T[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    async function loadContent() {
      await RTClient.setPageEntering("social", getCurrentUserID());

      const data = await GetSocial();
      if (!data) return;
      setFriends(data?.friends);
      setRecommendatoins(data?.recommendations);
      setChats(data?.chats);
    };

    loadContent();
  }, [])


  const renderItem = ({ item }: { item: any }) => {
    switch (activeTab) {
      case "Friends":
        return <FriendCard friend={item} />;
      case "Recommendations":
        return <RecommendationCard item={item} />;
      case "Activity":
        return null;
      case "Chats":
        return <ChatCard item={item} />;
    };
  };

  const data = useMemo(() => {
    switch (activeTab) {
      case "Friends":
        return friends;
      case "Recommendations":
        return recommendations;
      case "Activity":
        return activity;
      case "Chats":
        return chats;
    }
  }, [activeTab]);

  return (
    <View style={{ flex: 1 }}>
      <ScreenBackground>
        <Spacer orientation="v" spacing={hp(5)} />
        <SocialPageTopBar onTabChange={(tab: string) => setActiveTab(tab)} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
        />
      </ScreenBackground>
      <BottomBar />
    </View>
  );
};