import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActorProfileScreen from "@/app/credit_details/CreditDetailScreen";
import MovieCreditsScreen from "@/app/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import UserProfileScreen from "@/app/profile/UserProfileScreen";
import SocialScreen from "@/app/social/SocialScreen";
import DirectChatScreen from "@/app/direct_chat/DirectChatScreen";

const Stack = createNativeStackNavigator();

export default function SocialNavigatorStack() {

  return (
    <>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen name="SocialScreen" component={SocialScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DirectChatScreen" component={DirectChatScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}