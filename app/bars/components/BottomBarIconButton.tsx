import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { PressableScale } from "react-native-pressable-scale";

const icons = {
  home: require('@/app/bars/assets/home.png'),
  search: require('@/app/bars/assets/search.png'),
  profile: require('@/app/bars/assets/profile.png'),
  social: require('@/app/bars/assets/social.png'),
  library: require('@/app/bars/assets/bookmark.png'),
};

const styles = {
  alignItems: "center",
}

export default function BottomBarIconButton({ source, navigateTo, style }: { source: any, navigateTo: string, style: any }) {
  const navigator = useNavigation();
  return (
    <PressableScale
      activeScale={0.9}
      onPress={() => {
        navigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: navigateTo }]
          })
        );
      }} style={style || styles}>
      <Image source={icons[source]} style={{ width: 30, height: 30 }}></Image>
    </PressableScale>
  )
}