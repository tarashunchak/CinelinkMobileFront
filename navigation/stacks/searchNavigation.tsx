import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import UserProfileScreen from "@/app/profile/UserProfileScreen";
import WatchlistDetailsScreen from "@/app/watchlist/WatchlistDetailsScreen";
import SearchScreen from "@/app/search/SearchScreen";
import SearchResultBlock from "@/app/search/components/SearchResultBlock";
import CreditDetailScreen from "@/app/credit_details/CreditDetailScreen";

const Stack = createNativeStackNavigator();

export default function SearchNavigatorStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchResultBlock} options={{ headerShown: false }} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SearchTMPLT" component={SearchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreditDetailScreen" component={CreditDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistDetailScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}