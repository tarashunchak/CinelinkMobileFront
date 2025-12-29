import React from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import UserProfileScreen from "@/app/profile/UserProfileScreen";
import WatchlistsScreen from "@/app/library/WatchlistsLibraryScreen";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";
import SearchNavigatorStack from "./stacks/searchNavigation";
import AuthNavigatorStack from "./stacks/authNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Home" component={HomeNavigatorStack} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Social" component={SocialNavigatorStack} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Library" component={LibraryNavigatorStack} />
      <Tab.Screen name="Profile" component={ProfileNavigatorStack} />
      <Tab.Screen name="Search" component={SearchNavigatorStack} />
    </Tab.Navigator >
  );
}