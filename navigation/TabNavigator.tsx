import React from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";
import SearchNavigatorStack from "./stacks/searchNavigation";
import * as Notifications from "@/utils/notifications";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  Notifications.requestUserPermission();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: {
        position: "absolute",
        display: "none",
      },
      animation: "fade",
    }}
    >
      <Tab.Screen name="Home" component={HomeNavigatorStack} />
      <Tab.Screen name="Social" component={SocialNavigatorStack} />
      <Tab.Screen name="Library" component={LibraryNavigatorStack} />
      <Tab.Screen name="Profile" component={ProfileNavigatorStack} />
      <Tab.Screen name="Search" component={SearchNavigatorStack} />
    </Tab.Navigator >
  );
}