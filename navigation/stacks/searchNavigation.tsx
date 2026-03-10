import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActorProfileScreen from "@/app/credit_details/CreditDetailScreen";
import CollectionScreen from "@/app/collection/CollectionScreen";
import MovieCreditsScreen from "@/app/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import UserProfileScreen from "@/app/profile/UserProfileScreen";

import WatchlistsLibraryScreen from "@/app/library/WatchlistsLibraryScreen";
import WatchlistDetailsScreen from "@/app/watchlist/WatchlistDetailsScreen";
import HomePageScreen from "@/app/home/HomeScreen";
import SearchScreen from "@/app/search/SearchScreen";

const Stack = createNativeStackNavigator();

export default function SearchNavigatorStack() {

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}