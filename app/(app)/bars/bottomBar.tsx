import React, { memo, useEffect, useState } from "react";
import { View } from "react-native";
import BottomBarIconButton from "./components/BottomBarIconButton";
import { Platform, StyleSheet } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, { useAnimatedProps, withSpring, useSharedValue, withTiming, useDerivedValue, useAnimatedStyle } from "react-native-reanimated";
import useValue, { BackdropBlur, Blur, Canvas, ColorMatrix, Fill, FractalNoise, Group, LinearGradient, LumaColorFilter, Mask, RadialGradient, rect, Rect, RoundedRect, rrect, Skia, vec } from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
import { useRouter, useSegments } from "expo-router";
import { useBlurStore } from "@/components/ui/screen-background";

function SVGBottomBar() {
  const circleX = useSharedValue<number>(50);
  const circleY = useSharedValue(10);
  const middleX = 50;
  const middleY = 10;
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const animatedCircleProps = useAnimatedProps(() => ({
    cx: circleX.value,
  }));

  const animatedPathProps = useAnimatedProps(() => ({
    d: `M 10 4 
          L 90 4
          C 100 4 100 20 90 19 
          L 10 20 
          C 0 20 0 4 10 4
          L 10 4 
          `
  }));

  const animatedTileProps = useAnimatedProps(() => ({
    d: `M ${circleX.value - 6} 5 
        L ${circleX.value + 6} 5
        C ${circleX.value + 12} 5 ${circleX.value + 12} 19 ${circleX.value + 6} 19
        L ${circleX.value - 6} 19
        C ${circleX.value - 10} 19 ${circleX.value - 10} 5 ${circleX.value - 6} 5
        `
  }));

  return (
    <View style={{ position: "absolute", zIndex: 2, bottom: hp(2), left: 0, right: 0, width: wp(100), height: hp(10), alignSelf: "center" }}>
      <Svg height="100%" width="100%" viewBox="0 0 100 22">
        <AnimatedPath
          d={
            `M 10 4 L ${circleX.value - 20} 4
          C ${circleX.value - 12} 4.3 ${circleX.value - 6} -0.5 ${circleX.value} 0 
          C ${circleX.value + 6} -0.5 ${circleX.value + 12} 4.5 ${circleX.value + 20} 4
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
            `M ${circleX.value - 6} 5 
            L ${circleX.value + 6} 5
            C ${circleX.value + 12} 5 ${circleX.value + 12} 19 ${circleX.value + 6} 19
            L ${circleX.value - 6} 19
            C ${circleX.value - 10} 19 ${circleX.value - 10} 5 ${circleX.value - 6} 5
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
          onPress={() => {
            circleX.value = withSpring(13, {
              stiffness: 4,
              mass: 100,
              damping: 4,
            });
          }} />
        <BottomBarIconButton source="search" navigateTo="Search" onPress={() => {
          circleX.value = withSpring(31.5, {
            stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }} />
        <BottomBarIconButton source="home" navigateTo="Home" onPress={() => {
          circleX.value = withSpring(50, {
            stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }} />
        <BottomBarIconButton source="social" navigateTo="Social" onPress={() => {
          circleX.value = withSpring(68.5, {
            stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }} />
        <BottomBarIconButton source="profile" navigateTo="Profile" onPress={() => {
          circleX.value = withSpring(87, {
            stiffness: 4,
            mass: 100,
            damping: 4,
          });
        }} />
      </View>
    </View>
  );
};

function BottomBar_() {
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

const height = 54;
const width = wp(92);
const indicatorBase = rrect(rect(0, 2, 76, 49), 24, 24);
const indicatorStroke = rrect(rect(0, 2, 76, 49), 24, 24);
const r = rrect(rect(0, 0, width, height), 27, 27);
const mainStroke = rrect(rect(1, 1, width - 2, height - 2), 27, 27);

const Indicator = ({ x }: any) => {
  const matrix = useDerivedValue(() => {
    const m3 = Skia.Matrix();
    m3.translate(x.value, 0);
    return m3;
  });
  const dynamicBase = useDerivedValue(() => {
    return rrect(rect(x.value, 2, 76, 50), 24, 24);
  });
  const dynamicStroke = useDerivedValue(() => {
    return rrect(rect(x.value, 2, 76, 50), 23, 23);
  });
  const transform = useDerivedValue(() => [
    { translateX: x.value }
  ]);

  return (
    <>
      <RoundedRect rect={dynamicBase} strokeWidth={1} color="rgba(180, 190, 190, 0.2)" />
      <RoundedRect rect={dynamicStroke} style="stroke" strokeWidth={0.1} />
    </>
  )
};

const SkiaBottomBar = memo(({ children }: any) => {
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <RoundedRect rect={r} style="stroke" strokeWidth={0} >
        <RadialGradient
          c={vec(width / 2, 0)}
          r={25}
          colors={["white", "rgba(120, 120, 120, 0.2)"]}
        />
      </RoundedRect>
      <RoundedRect rect={mainStroke} style="stroke" strokeWidth={0.4} >
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={[
            "rgba(140, 140, 140, 0.8)",
            "rgba(140, 140, 140, 0)",
          ]}
        />
      </RoundedRect>
      {children}
    </Canvas>
  );
});

function BottomBar() {
  const router = useRouter();
  const segments = useSegments();

  const blurTarget = useBlurStore((state) => state.blurTargetRef);

  const tabX = useSharedValue(width / 2 - 38);

  const moveToTab = (newX: number) => {
    tabX.value = withSpring(newX)
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: tabX.value }],
  }));
  const handlePress = (route: string) => {
    //tabX.value = withTiming(tabOffsetX[route], { duration: 1500 })
    router.navigate({
      pathname: route,
    });
  };

  const dynamicBase = useDerivedValue(() => {
    return rrect(rect(tabX.value, 2, 76, 50), 24, 24);
  });
  const dynamicStroke = useDerivedValue(() => {
    return rrect(rect(tabX.value, 2, 76, 50), 23, 24);
  });

  /*const matrix = useValue(() => {
    const m3 = Skia.Matrix();
    m3.translate(tabX.value, 0);
    return m3;
  });*/

  const transform = useDerivedValue(() => [
    { translateX: tabX.value }
  ]);

  const translateX = useAnimatedStyle(()=>{
    return {
      transform: [{translateX: tabX.value}],
    }
  });

  const currentSegment = segments[segments?.length - 1];

  useEffect(()=>{
    const current = segments[segments?.length - 1];
    const offsetX = tabOffsetX[current];

    if(offsetX === undefined || tabX.value === offsetX) return
    tabX.value = withTiming(offsetX, {duration: 500});
    console.log("UseEffect BottomBar");
  }, [currentSegment]);

  return (
    <View style={{ width, height, position: "absolute", bottom: wp(4), alignSelf: "center", overflow: "hidden", borderRadius: 27 }}>
      <BlurView
        tint="systemUltraThinMaterialDark"
        intensity={140}
        blurReductionFactor={15}
        style={StyleSheet.absoluteFill}
        blurMethod="dimezisBlurView"
        blurTarget={blurTarget}
      />
      <Canvas style={StyleSheet.absoluteFill}>
        <RoundedRect rect={r} style="stroke" strokeWidth={0.3} >
          <RadialGradient
            c={vec(width / 2, 0)}
            r={35}
            colors={["white", "rgba(220, 220, 220, 0.2)"]}
          />
        </RoundedRect>
        <RoundedRect rect={mainStroke} style="stroke" strokeWidth={0.1} >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={[
              "rgba(140, 140, 140, 0.8)",
              "rgba(140, 140, 140, 0)",
            ]}
          />
        </RoundedRect>
      </Canvas>
      <View style={styles.view}>
        <BottomBarIconButton source="library" navigateTo="Library" onPress={() => handlePress("/library")} />
        <BottomBarIconButton source="search" navigateTo="Search" onPress={() => handlePress("/search")} />
        <BottomBarIconButton source="home" navigateTo="Home" onPress={() => {
          handlePress("/home");
        }} />
        <BottomBarIconButton source="social" navigateTo="Social" onPress={() => {
          handlePress("/social");
        }} />
        <BottomBarIconButton source="profile" navigateTo="Profile" onPress={() => {
          handlePress("/profile");
        }} />
      </View>
<Animated.View
      style={[
        {
          position: "absolute",
          top: 2,
          width: 76,
          height: 50,
          backgroundColor: "white",
        },
translateX,
      ]}
      />
    </View>
  )
};

export default memo(BottomBar);

//export default memo(BottomBar);

/** 
 * <LinearGradient
              start={vec(0, 0)}
              end={vec(wp(96), height)}
              colors={[
                "rgba(100, 100, 255, 0.8)",
                "rgba(0, 0, 0, 0.3)",
              ]}
            />


            /////
<RoundedRect rect={r} >
          <ColorMatrix
            matrix={[
              0.09, 0.187, 0.014, 0, 0,
              0.09, 0.187, 0.014, 0, 0,
              0.09, 0.187, 0.014, 0, 0,
              0, 0, 0, 0.2, 0
            ]}
          />
          <FractalNoise
            freqY={0.3}
            freqX={0.3}
            octaves={2}
          />
        </RoundedRect>


        ////


*/

const styles = StyleSheet.create({
  mainView: {
    zIndex: 2,
    height: Platform.OS === "ios" ? "7%" : "6.5%",
    margin: "2%",
    width: "94%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderWidth: 0.5,
    //borderColor: "rgba(180, 200, 210, 0.5)",
    borderRadius: 999,
    //backgroundColor: "rgba(23, 23, 23, 1)",
    backgroundColor: "#101010",
    justifyContent: "center",
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
    //borderColor: "rgba(180, 200, 210, 0.5)",
    //borderWidth: 0.5,
    //borderRadius: 999,
  },
});

const tabOffsetX = {
  "library": 2,
  "search": 70,
  "home": width/2 - 38,
  "social": width / 2 + 32,
  "profile": width - 78,
}