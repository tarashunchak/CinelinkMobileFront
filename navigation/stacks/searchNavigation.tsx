import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ActorProfileScreen from "@/app/credit_details/CreditDetailScreen";
import CollectionScreen from "@/app/collection/CollectionScreen";
import MovieCreditsScreen from "@/app/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import UserProfileScreen from "@/app/profile/UserProfileScreen";

import WatchlistsLibraryScreen from "@/app/library/WatchlistsLibraryScreen";
import WatchlistDetailsScreen from "@/app/watchlist/WatchlistDetailsScreen";
import HomePageScreen from "@/app/home/HomeScreen";
import SearchScreen from "@/app/search/SearchScreen";
import SearchResultBlock from "@/app/search/components/SearchResultBlock";

const Stack = createNativeStackNavigator();

export default function SearchNavigatorStack() {

  return (
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchResultBlock} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchTMPLT" component={SearchScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}