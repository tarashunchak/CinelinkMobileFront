import React, { memo, useEffect } from "react";
import {  Pressable, View } from "react-native";
import BottomBarIconButton from "./components/BottomBarIconButton";
import { Platform, StyleSheet } from "react-native";
import Slider from "./components/Slider";
import { useNavigationState } from "@react-navigation/native";
import {Circle, Line, Path, Svg} from "react-native-svg";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Animated, { Easing, useAnimatedProps, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { PressableScale } from "react-native-pressable-scale";

function SVGBottomBar(){
  const circleX = useSharedValue<number>(50);
  const circleY = useSharedValue(10);
  const middleX = 50;
  const middleY = 10;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const animatedCircleProps = useAnimatedProps(()=>({
    cx: circleX.value,
  }));

  const animatedPathProps = useAnimatedProps(()=>({
      d:  `M 10 4 L ${circleX.value-20} 4
          C ${circleX.value-12} 4.3 ${circleX.value-6} -0.5 ${circleX.value} 0 
          C ${circleX.value+6} -0.5 ${circleX.value+12} 4.5 ${circleX.value+20} 4
          L 90 4
          C 100 4 100 19 90 19 
          L ${circleX.value+12} 19 
          C ${circleX.value+6} 19.2 ${circleX.value+4} 19.6 ${circleX.value} 20 
          C ${circleX.value-4} 19.6 ${circleX.value-6} 19.2 ${circleX.value-12} 19 
          L 10 19 
          C 0 19 0 4 10 4
          L 10 4 
          ` 
  }));

  return (
    <View style={{position:"absolute", zIndex:2, bottom: hp(2), left: 0, right: 0, width:wp(100), height:hp(10), alignSelf: "center" }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 20">
        <AnimatedPath 
          d={
          `M 10 4 L ${circleX.value-20} 4
          C ${circleX.value-12} 4.3 ${circleX.value-6} -0.5 ${circleX.value} 0 
          C ${circleX.value+6} -0.5 ${circleX.value+12} 4.5 ${circleX.value+20} 4
          L 90 4
          C 100 4 100 19 90 19 
          L ${circleX.value+12} 19 
          C ${circleX.value+6} 19.2 ${circleX.value+4} 19.6 ${circleX.value} 20 
          C ${circleX.value-4} 19.6 ${circleX.value-6} 19.2 ${circleX.value-12} 19 
          L 10 19 
          C 0 19 0 4 10 4
          L 10 4 
          ` 
          } 
          stroke="white" 
          strokeWidth="0.1"
          fill="#0f0f0f"
          animatedProps={animatedPathProps}
        />

        <AnimatedCircle 
          cx={50} 
          cy={10} 
          r="10" 
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth={0.3}
          animatedProps={animatedCircleProps}
        />
      </Svg>
      <View style={bottomBar.view}>
        <BottomBarIconButton source="library" navigateTo="Library" 
        onPress={()=>{
          circleX.value = withSpring(13);
        }}/>
        <BottomBarIconButton source="search" navigateTo="Search" onPress={()=>{
          circleX.value = withSpring(33);
        }}/>
        <BottomBarIconButton source="home" navigateTo="Home" onPress={()=>{
          circleX.value = withSpring(50);
        }}/>
        <BottomBarIconButton source="social" navigateTo="Social" onPress={()=>{
          circleX.value = withSpring(67);
        }}/>
        <BottomBarIconButton source="profile" navigateTo="Profile" onPress={()=>{
          circleX.value = withSpring(87);
        }}/>
      </View>
    </View>
  );
};

function BottomBar() {
  const route = useNavigationState(state => state.routes[state.index].name);
  return (
    <View style={bottomBar.mainView}>
      <View style={bottomBar.view}>
        <BottomBarIconButton source="library" navigateTo="Library" />
        <BottomBarIconButton source="search" navigateTo="Search" />
        <BottomBarIconButton source="home" navigateTo="Home" />
        <BottomBarIconButton source="social" navigateTo="Social" />
        <BottomBarIconButton source="profile" navigateTo="Profile" />
      </View>
      <Slider activeTab={route}/>
    </View>
  );
};

export default memo(SVGBottomBar);

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
    position:"absolute",
    width:"100%",
    height:"100%",
  },
});