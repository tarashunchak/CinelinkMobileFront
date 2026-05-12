import React, { memo } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";

const TAB_POS = {
  "WatchlistsLibraryScreen": 0,
  "Search": 1,
  "HomePage": 2,
  "SocialScreen": 3,
  "UserProfileScreen": 4,
};

function Slider({activeTab}:{activeTab: string}){
  const offset = useSharedValue(0);

  console.log("Slide update: ", activeTab);
  offset.value = withSpring(TAB_POS[activeTab] * widthPercentageToDP(96/5-3), {
    damping: 10,
    stiffness: 100,
  });

  const animatedStyle = useAnimatedStyle(()=>({
    transform: [{
      translateX: offset.value,
    }],
  }));

  return (
    <Animated.View 
      style={[styles.mainView, animatedStyle]}
    />
  );
};

export default memo(Slider);

const styles = StyleSheet.create({
  mainView: {
    height:  hp("8%"), 
    width:  hp("8%"),
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 1)",
    position: "absolute",
    alignSelf:"center",
    left: "7.5%",
  },
});