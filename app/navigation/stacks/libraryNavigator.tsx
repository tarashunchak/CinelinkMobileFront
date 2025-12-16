import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActorProfileScreen from "../../screens/ActorPage/ActorProfileScreen";
import CollectionScreen from "../../screens/CollectionPage/CollectionScreen";
import MovieCreditsScreen from "../../screens/MovieDetailsPage/MovieCreditsScreen";
import MovieDetailScreen from "../../screens/MovieDetailsPage/MovieDetailScreen";
import UserProfileScreen from "../../screens/UserPage/UserProfileScreen";

import WatchlistsLibraryScreen from "../../screens/WatchlistsLibraryPage/WatchlistsLibraryScreen";
import WatchlistDetailsScreen from "../../screens/WatchlistDetailsPage/WatchlistDetailsScreen";

const Stack = createNativeStackNavigator();

export default function LibraryNavigatorStack() {

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CollectionScreen" component={CollectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WatchlistDetailsScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}