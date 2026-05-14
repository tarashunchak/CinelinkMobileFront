import React, { memo } from "react";
import { View } from "react-native";
import BottomBarIconButton from "./components/BottomBarIconButton";
import { Platform, StyleSheet } from "react-native";
import {Circle, Path, Svg} from "react-native-svg";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Animated, { useAnimatedProps, withSpring, useSharedValue } from "react-native-reanimated";

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
      d:  `M 10 4 
          L 90 4
          C 100 4 100 20 90 19 
          L 10 20 
          C 0 20 0 4 10 4
          L 10 4 
          `
  }));

  const animatedTileProps = useAnimatedProps(()=>({
    d: `M ${circleX.value-6} 5 
        L ${circleX.value+6} 5
        C ${circleX.value+12} 5 ${circleX.value+12} 19 ${circleX.value+6} 19
        L ${circleX.value-6} 19
        C ${circleX.value-10} 19 ${circleX.value-10} 5 ${circleX.value-6} 5
        `
  }));

  return (
    <View style={{position:"absolute", zIndex:2, bottom: hp(2), left: 0, right: 0, width:wp(100), height:hp(10), alignSelf: "center" }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 22">
        <AnimatedPath 
          d={
          `M 10 4 L ${circleX.value-20} 4
          C ${circleX.value-12} 4.3 ${circleX.value-6} -0.5 ${circleX.value} 0 
          C ${circleX.value+6} -0.5 ${circleX.value+12} 4.5 ${circleX.value+20} 4
          L 90 4
          C 100 4 100 20 90 19 
          L 90 20 
          C 0 20 0 4 10 4
          L 10 4 
          ` 
          } 
          stroke="white" 
          strokeWidth="0.05"
          fill="#0f0f0f"
          animatedProps={animatedPathProps}
        />
        <AnimatedPath
          d={
            `M ${circleX.value-6} 5 
            L ${circleX.value+6} 5
            C ${circleX.value+12} 5 ${circleX.value+12} 19 ${circleX.value+6} 19
            L ${circleX.value-6} 19
            C ${circleX.value-10} 19 ${circleX.value-10} 5 ${circleX.value-6} 5
            `
          }
          animatedProps={animatedTileProps}
          stroke="white"
          strokeWidth="0.1"
          fill="purple"
        />
          
        <AnimatedCircle 
          cx={50} 
          cy={11} 
          r="8" 
          fill="rgba(255, 255, 255, 0.05)"
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth={0.3}
          animatedProps={animatedCircleProps}
        />
      </Svg>
      <View style={bottomBar.view}>
        <BottomBarIconButton source="library" navigateTo="Library" 
        onPress={()=>{
          circleX.value = withSpring(13, {
            stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }}/>
        <BottomBarIconButton source="search" navigateTo="Search" onPress={()=>{
          circleX.value = withSpring(31.5, {stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }}/>
        <BottomBarIconButton source="home" navigateTo="Home" onPress={()=>{
          circleX.value = withSpring(50, {stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }}/>
        <BottomBarIconButton source="social" navigateTo="Social" onPress={()=>{
          circleX.value = withSpring(68.5, {stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }}/>
        <BottomBarIconButton source="profile" navigateTo="Profile" onPress={()=>{
          circleX.value = withSpring(87, {stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }}/>
      </View>
    </View>
  );
};

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
    borderColor: "rgba(180, 200, 210, 0.5)",
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