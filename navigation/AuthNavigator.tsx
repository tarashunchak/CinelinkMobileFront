import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AuthNavigatorStack from "./stacks/authNavigation";
import React from "react";

const Tab = createBottomTabNavigator();

export default function AuthNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Auth" component={AuthNavigatorStack} />
    </Tab.Navigator >
  )
}