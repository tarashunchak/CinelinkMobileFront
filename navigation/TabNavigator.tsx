import React, { useEffect, useRef } from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";
import SearchNavigatorStack from "./stacks/searchNavigation";
import * as Notifications from "@/utils/notifications";
import { ChatsManager } from "@/src/rt_client/managers/chats_manager";
import { UsersManager } from "@/src/rt_client/managers/users_manager";
import { WatchlistsManager } from "@/src/rt_client/managers/watchlists_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
import { RTClient } from "@/src/rt_client/rt_client";
import BottomBar from "@/app/(app)/bars/bottomBar";
import ScreenBackground, { useBlurStore } from "@/src/components/ui/screen-background";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/build/native-tabs";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  //Notifications.requestUserPermission();
  const currentUserID = useAuthStore(state => state.user?.user_id);

  useEffect(() => {
    if (!currentUserID) return;

    ChatsManager.getInstance().init(currentUserID);
    UsersManager.getInstance().init(currentUserID);
    WatchlistsManager.getInstance().init(currentUserID);

    RTClient.connect(currentUserID);
  }, [currentUserID]);

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        display: "none",
        position: "absolute",
      },
      animation: "fade",
    }}
    tabBar={(props)=><BottomBar {...props}/>}
    >
      <Tab.Screen name="Home" component={HomeNavigatorStack} />
      <Tab.Screen name="Library" component={LibraryNavigatorStack} />
      <Tab.Screen name="Search" component={SearchNavigatorStack} />
      <Tab.Screen name="Social" component={SocialNavigatorStack} />
      <Tab.Screen name="Profile" component={ProfileNavigatorStack} />
    </Tab.Navigator >
  );
};