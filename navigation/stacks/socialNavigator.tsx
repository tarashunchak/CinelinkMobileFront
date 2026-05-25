import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ActorProfileScreen from "@/app/(app)/credit_details";
import MovieCreditsScreen from "@/src/features/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/(app)/movie_details";
import UserProfileScreen from "@/app/(app)/(tabs)/tab_profile";
import DirectChatScreen from "@/app/(app)/direct_chat";

const Stack = createNativeStackNavigator();

export default function SocialNavigatorStack() {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen name="DirectChatScreen" component={DirectChatScreen} />
    </Stack.Navigator>
  )
}