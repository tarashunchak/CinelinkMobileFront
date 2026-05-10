import React, { memo } from "react";
import { View } from "react-native";
import BottomBarIconButton from "./components/BottomBarIconButton";
import { Platform, StyleSheet } from "react-native";
import Slider from "./components/Slider";

function BottomBar() {
  return (
    <View style={bottomBar.mainView}>
      <View style={bottomBar.view}>
        <BottomBarIconButton source="library" navigateTo="Library" />
        <BottomBarIconButton source="search" navigateTo="Search" />
        <BottomBarIconButton source="home" navigateTo="Home" />
        <BottomBarIconButton source="social" navigateTo="Social" />
        <BottomBarIconButton source="profile" navigateTo="Profile" />
      </View>
      <Slider/>
    </View>
  );
};

export default memo(BottomBar);

const bottomBar = StyleSheet.create({
  mainView:{
    zIndex: 2,
    height: Platform.OS === "ios" ? "7%" : "6.5%",
    margin: "2%",
    width: "94%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(180, 190, 210, 0.5)",
    borderRadius: 999,
    backgroundColor: "rgba(23, 23, 23, 1)",
    justifyContent: "center",
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});