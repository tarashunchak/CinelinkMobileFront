import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { heightPercentageToDP as hp} from "react-native-responsive-screen";

function Slider(){
  const offset = useSharedValue(0);
  offset.value = withSpring(100, {
    damping: 10,
    stiffness: 100,
    mass: 1,
    overshootClamping: false,
  });

  const animatedStyle = useAnimatedStyle(()=>({
    transform: [{translateX: offset.value}],
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
    height: 4,
    width: 50,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.15,
    borderColor: "white",
    position: "absolute",
    bottom: 8,
    left: "7.5%",
  },
});