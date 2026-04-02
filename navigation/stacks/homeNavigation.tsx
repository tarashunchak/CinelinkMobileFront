import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MovieCreditsScreen from "@/app/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "@/app/movie_details/MovieDetailScreen";
import WatchlistsLibraryScreen from "@/app/library/WatchlistsLibraryScreen";
import WatchlistDetailsScreen from "@/app/watchlist/WatchlistDetailsScreen";
import HomePageScreen from "@/app/home/HomeScreen";
import CreditDetailScreen from "@/app/credit_details/CreditDetailScreen";
const Stack = createNativeStackNavigator();

export default function HomeNavigatorStack() {
  return (
    <Stack.Navigator
    screenOptions={{headerShown:false,
      contentStyle:{flex:1, backgroundColor:"transparent"}}}
    >
      <Stack.Screen name="HomePage" component={HomePageScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreditDetailScreen" component={CreditDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WatchlistDetailsScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}