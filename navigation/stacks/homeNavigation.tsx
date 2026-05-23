//import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import MovieCreditsScreen from "@/app/(app)/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/(app)/movie_details";
import WatchlistsLibraryScreen from "@/app/(app)/library";
import WatchlistScreen from "@/app/(app)/watchlist";
import HomePageScreen from "@/app/(app)/home";
import CreditDetailScreen from "@/app/(app)/credit_details";
import * as ExpoRouter from "expo-router";

const Stact = ExpoRouter.

export default function HomeNavigatorStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { flex: 1, backgroundColor: "transparent" },
        animation: "ios_from_right",
      }}
    >
      <Stack.Screen name="HomePage" component={HomePageScreen} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} />
      <Stack.Screen name="CreditDetailScreen" component={CreditDetailScreen} />
      <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} />
      <Stack.Screen name="WatchlistScreen" component={WatchlistScreen} />
    </Stack.Navigator>
  )
}