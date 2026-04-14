import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import ActorProfileScreen from "@/app/credit_details/CreditDetailScreen";
import CollectionScreen from "@/app/collection/CollectionScreen";
import MovieCreditsScreen from "@/app/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import UserProfileScreen from "@/app/profile/UserProfileScreen";

import WatchlistsLibraryScreen from "@/app/library/WatchlistsLibraryScreen";
import WatchlistDetailsScreen from "@/app/watchlist/WatchlistDetailsScreen";
import HomePageScreen from "@/app/home/HomeScreen";
import DirectChatScreen from "@/app/direct_chat/DirectChatScreen";

const Stack = createNativeStackNavigator();

export default function ProfileNavigatorStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistDetailsScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DirectChatScreen" component={DirectChatScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}