import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActorProfileScreen from "../app/(app)/credit_details";
import CreatePasswordScreen from "../app/(auth)/CreatePasswordScreen";
import EmailVerifyingScreen from "../app/(auth)/EmailVerifyingScreen";
import ForgotPasswordScreen1 from "../app/(auth)/ForgotPasswordScreen1";
import LoginScreen from "../app/(auth)/login";
import RegistrationScreen from "../app/(auth)/registration";
import CollectionScreen from "../app/collection/CollectionScreen";
import Error500Screen from "../app/(app)/error/500";
import ExploreScreen from "../app/(app)/search/ExploreScreen";
import SearchScreen from "../app/(app)/search/SearchScreen";
import HomePageScreen from "../app/(app)/home";
import MovieCreditsScreen from "../app/(app)/movie_details/MovieCreditsScreen";
import MovieDetailScreen from "../app/(app)/movie_details/MovieDetailScreen";
import OnboardingScreen from "../app/OnboardingScreen";
import SettingScreen from "../app/SettingScreen";
import CurrentUserProfileScreen from "../app/(app)/profile/CurrentUserProfileScreen";
import UserProfileScreen from "../app/(app)/(tabs)/tab_profile";
import SocialScreen from "../app/(app)/social";

import WatchlistsLibraryScreen from "../app/(app)/library";
import WatchlistDetailsScreen from "../app/(app)/watchlist";
import LibraryNavigatorStack from "./stacks/libraryNavigator";

/*const Stack = createNativeStackNavigator();

export default function LeafyNavigator() {

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen name="HomePageScreen" component={HomePageScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen1" component={ForgotPasswordScreen1} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmailVerifying" component={EmailVerifyingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Error500Screen" component={Error500Screen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieDetailScreen" component={MovieDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CurrentUserProfileScreen" component={CurrentUserProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MovieCreditsScreen" component={MovieCreditsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ActorProfileScreen" component={ActorProfileScreen} options={{ headerShown: false }} />

        <Stack.Screen name="WatchlistsLibraryScreen" component={WatchlistsLibraryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WatchlistDetailsScreen" component={WatchlistDetailsScreen} options={{ headerShown: false }} />

        <Stack.Screen name="SocialScreen" component={SocialScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}*/