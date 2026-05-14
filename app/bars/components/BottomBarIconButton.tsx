import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";

const icons = {
  home: require('@/app/bars/assets/home.png'),
  search: require('@/app/bars/assets/search.png'),
  profile: require('@/app/bars/assets/profile.png'),
  social: require('@/app/bars/assets/social.png'),
  library: require('@/app/bars/assets/bookmark.png'),
};

function BottomBarIconButton({ source, navigateTo, onPress }: { source: string, navigateTo: string, onPress: ()=>void }) {
  const navigator = useNavigation();
  return (
    <PressableScale
      activeScale={0.9}
      onPress={() => {
        onPress?.();
        /*navigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: navigateTo }]
          })
        );*/
        navigator?.navigate(navigateTo);
      }} style={styles.main}>
      <Image
        source={icons[source]}
        style={styles.image}
        cachePolicy="memory"
      />
    </PressableScale>
  )
};

export default memo(BottomBarIconButton);

const styles = StyleSheet.create({
  main: {
    alignItems: "center",
  },
  image: {
    width: 30,
    height: 30,
  },
});