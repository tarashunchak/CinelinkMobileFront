import React from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";
import SearchNavigatorStack from "./stacks/searchNavigation";
//import * as Notifications from "@/utils/notifications";
import { ChatsManager } from "../app/rt_client/managers/chats_manager";
import { UsersManager } from "../app/rt_client/managers/users_manager";
import { WatchlistsManager } from "../app/rt_client/managers/watchlists_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
import { RTClient } from "../app/rt_client/rt_client";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  //Notifications.requestUserPermission();

  const currentUserID = useAuthStore?.getState()?.user?.user_id;
  
  ChatsManager.getInstance().init(currentUserID);
  UsersManager.getInstance().init(currentUserID);
  WatchlistsManager.getInstance().init(currentUserID);

  RTClient.connect(currentUserID);

  return (
    <>
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        display: "none",
        position: "absolute",
      },
      animation: "shift",
    }}
    >
      <Tab.Screen name="Home" component={HomeNavigatorStack} />
      <Tab.Screen name="Library" component={LibraryNavigatorStack} />
      <Tab.Screen name="Search" component={SearchNavigatorStack} />
      <Tab.Screen name="Social" component={SocialNavigatorStack} />
      <Tab.Screen name="Profile" component={ProfileNavigatorStack} />
    </Tab.Navigator >
</>
  );
};