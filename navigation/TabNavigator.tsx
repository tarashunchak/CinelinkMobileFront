import React from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";
import SearchNavigatorStack from "./stacks/searchNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <StatusBar hidden />
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
          <Tab.Screen name="Home" component={HomeNavigatorStack} options={{ unmountOnBlur: true }} />
          <Tab.Screen name="Social" component={SocialNavigatorStack} options={{ unmountOnBlur: true }} />
          <Tab.Screen name="Library" component={LibraryNavigatorStack} />
          <Tab.Screen name="Profile" component={ProfileNavigatorStack} options={{ unmountOnBlur: true }} />
          <Tab.Screen name="Search" component={SearchNavigatorStack} />
        </Tab.Navigator >
      </SafeAreaView>
    </SafeAreaProvider>
  );
}