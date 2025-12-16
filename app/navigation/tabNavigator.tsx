import React from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import UserProfileScreen from "../screens/UserPage/UserProfileScreen";
import WatchlistsScreen from "../screens/WatchlistsLibraryPage/WatchlistsLibraryScreen";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Home" component={HomeNavigatorStack} />
      <Tab.Screen name="Social" component={SocialNavigatorStack} />
      <Tab.Screen name="Library" component={LibraryNavigatorStack} />
      <Tab.Screen name="Profile" component={ProfileNavigatorStack} />
    </Tab.Navigator>
  );
}