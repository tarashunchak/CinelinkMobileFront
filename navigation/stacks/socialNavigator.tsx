import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ActorProfileScreen from "@/app/credit_details/CreditDetailScreen";
import MovieCreditsScreen from "@/app/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import UserProfileScreen from "@/app/profile/UserProfileScreen";
import SocialScreen from "@/app/social/SocialScreen";
import DirectChatScreen from "@/app/direct_chat/DirectChatScreen";

const Stack = createNativeStackNavigator();

export default function SocialNavigatorStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SocialScreen" component={SocialScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen name="DirectChatScreen" component={DirectChatScreen} />
    </Stack.Navigator>
  )
}