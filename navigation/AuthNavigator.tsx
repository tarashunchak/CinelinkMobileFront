import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "@/app/auth/LoginScreen";
import ForgotPasswordScreen from "@/app/auth/ForgotPasswordScreen1";
import CreatePasswordScreen from "@/app/auth/CreatePasswordScreen";
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