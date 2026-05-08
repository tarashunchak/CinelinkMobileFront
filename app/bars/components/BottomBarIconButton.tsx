import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React, { memo } from "react";
import { StyleSheet, Text } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { textStyle } from "@/styles/textStyles";

const icons = {
  home: require('@/app/bars/assets/home.png'),
  search: require('@/app/bars/assets/search.png'),
  profile: require('@/app/bars/assets/profile.png'),
  social: require('@/app/bars/assets/social.png'),
  library: require('@/app/bars/assets/bookmark.png'),
};

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  image: {
    width: 28,
    height: 28,
  },
});

function BottomBarIconButton({ source, navigateTo }: { source: string, navigateTo: string }) {
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
      }} style={styles.main}>
      <Image
        source={icons[source]}
        style={styles.image}
        cachePolicy="memory"
      />
      <Text style={textStyle.gray12}>{source}</Text>
    </PressableScale>
  )
};


export default memo(BottomBarIconButton);