import React from "react";
import { View } from "react-native";
import BottomBarIconButton from "./components/BottomBarIconButton";
import { bottomBar } from "./styles";

export default function BottomBar() {
  return (
    <View style={bottomBar.view} >
      <BottomBarIconButton source="library" navigateTo="WatchlistsLibraryScreen" />
      <BottomBarIconButton source="search" navigateTo="SearchScreen" />
      <BottomBarIconButton source="home" navigateTo="HomePageScreen" />
      <BottomBarIconButton source="social" navigateTo="SocialScreen" />
      <BottomBarIconButton source="profile" navigateTo="UserProfileScreen" />
    </View>
  );
}