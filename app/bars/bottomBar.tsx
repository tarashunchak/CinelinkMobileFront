import React, { useActionState } from "react";
import { View } from "react-native";
import BottomBarIconButton from "./components/BottomBarIconButton";
import { bottomBar } from "./styles";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export default function BottomBar() {
  return (
    <View style={bottomBar.view} >
      <BottomBarIconButton source="library" navigateTo="Library" />
      <BottomBarIconButton source="search" navigateTo="Search" />
      <BottomBarIconButton source="home" navigateTo="Home" />
      <BottomBarIconButton source="social" navigateTo="Social" />
      <BottomBarIconButton source="profile" navigateTo="Profile" />
    </View>
  );
}