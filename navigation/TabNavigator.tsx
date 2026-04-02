import React from "react";
import LibraryNavigatorStack from "./stacks/libraryNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SocialNavigatorStack from "./stacks/socialNavigator";
import ProfileNavigatorStack from "./stacks/profileNavigation";
import HomeNavigatorStack from "./stacks/homeNavigation";
import SearchNavigatorStack from "./stacks/searchNavigation";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={{ 
        headerShown: false, 
        tabBarStyle: {
          position:"absolute",
          display: "none", 
        },
        }}
      >
        <Tab.Screen name="Home" component={HomeNavigatorStack} />
        <Tab.Screen name="Social" component={SocialNavigatorStack} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Library" component={LibraryNavigatorStack} />
        <Tab.Screen name="Profile" component={ProfileNavigatorStack} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Search" component={SearchNavigatorStack} />
      </Tab.Navigator >
  );
}