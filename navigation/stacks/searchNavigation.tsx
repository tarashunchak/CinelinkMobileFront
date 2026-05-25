import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MovieDetailScreen from "@/app/(app)/movie_details";
import UserProfileScreen from "@/app/(app)/(tabs)/tab_profile";
import WatchlistDetailsScreen from "@/app/(app)/watchlist";
import SearchResultBlock from "@/app/(app)/(tabs)/search";
import CreditDetailScreen from "@/app/(app)/credit_details";

const Stack = createNativeStackNavigator();

export default function SearchNavigatorStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchResultBlock} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreditDetailScreen" component={CreditDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistDetailScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}