/*import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import ActorProfileScreen from "@/app/(app)/credit_details";
import MovieCreditsScreen from "@/app/(app)/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/(app)/movie_details";
import UserProfileScreen from "@/app/(app)/(tabs)/profile";

import WatchlistsLibraryScreen from "@/app/(app)/library";
import WatchlistDetailsScreen from "@/app/(app)/watchlist";
import AddWatchlist from "@/app/(app)/library/components/addWatchlist";

const Stack = createNativeStackNavigator();

export default function LibraryNavigatorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation:"default",
      }}
    >
      <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistDetailsScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddWatchlist" component={AddWatchlist} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}*/


export default function LibraryNavigatorStack() {
  return (<Stack/>)
}