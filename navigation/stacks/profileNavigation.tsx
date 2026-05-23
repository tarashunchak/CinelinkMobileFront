import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreditDetailsScreen from "@/app/(app)/credit_details";
import MovieCreditsScreen from "@/app/(app)/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/(app)/movie_details";
import UserProfileScreen from "@/app/(app)/profile";

import WatchlistsLibraryScreen from "@/app/(app)/library";
import WatchlistDetailsScreen from "@/app/(app)/watchlist";
import DirectChatScreen from "@/app/(app)/direct_chat";

const Stack = createNativeStackNavigator();

export default function ProfileNavigatorStack() {

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} />
      <Stack.Screen name="CreditDetailsScreen" component={CreditDetailsScreen} />
      <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} />
      <Stack.Screen name="WatchlistDetailsScreen" component={WatchlistDetailsScreen} />
      <Stack.Screen name="DirectChatScreen" component={DirectChatScreen} />
    </Stack.Navigator>
  )
}