import React, { useState, useEffect, useCallback } from "react";
import { RecommendedCard_T } from "@/src/features/social/components/RecommendationsList";
import ChatsList from "@/src/features/social/components/DirectChatsList";
import { RTClient } from "@/src/rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";
import FriendsList from "@/src/features/social/components/FriendsList";
import { GetSocial } from "./services";
import SocialPageTopBar from "@/src/features/social/components/TopBar";
import RecommendationsList from "@/src/features/social/components/RecommendationsList";
import HeaderContainer from "@/src/components/ui/header-container";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { InteractionManager } from "react-native";

export default function SocialScreen() {
  const tabs = ["Chats", "Recommendations", "Activity", "Friends"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  //const [friends, setFriends] = useState<UserCard_T[]>(Array.from({ length: 8 }));
  const [recommendations, setRecommendatoins] = useState<RecommendedCard_T[]>([]);
  //const [chats, setChats] = useState<any[]>(Array.from({ length: 8 }));
  const [activity, setActivity] = useState<any[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function loadContent() {
      await RTClient.setPageEntering("social", getCurrentUserID());
      const data = await GetSocial();
      if (data) {
        //setFriends(data?.friends);
        setRecommendatoins(data?.recommendations);
        //setChats(data?.chats);
      }
    };
    InteractionManager.runAfterInteractions(()=>{
      setIsReady(true);
      loadContent();
    })
  }, []);

  const renderList = useCallback(() => {
    switch (activeTab) {
      case "Friends":
        return <FriendsList />
      case "Recommendations":
        return <RecommendationsList items={recommendations} />
      case "Activity":
        return null;
      case "Chats":
        return <ChatsList />;
    }
  }, [activeTab, recommendations, activity]);

  return (
    <GestureHandlerRootView>
      <HeaderContainer>
        <SocialPageTopBar onTabChange={(tab: string) => setActiveTab(tab)} />
        {isReady && renderList()}
      </HeaderContainer>
    </GestureHandlerRootView>
  );
};