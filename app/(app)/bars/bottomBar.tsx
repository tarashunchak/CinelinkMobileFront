import React, { memo, useCallback } from "react";
import BottomBarButtons from "./components/BottomBarIconButton";
import { View, Platform, StyleSheet } from "react-native";
import { Circle, Path, Svg } from "react-native-svg";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Animated, { useAnimatedProps, withSpring, useSharedValue, useDerivedValue, useAnimatedStyle } from "react-native-reanimated";
import { BackdropBlur, Blur, Canvas, ColorMatrix, FractalNoise, Group, LinearGradient, RadialGradient, rect, RoundedRect, rrect, Skia, vec } from "@shopify/react-native-skia";
import { BlurView } from "expo-blur";
import { useSegments } from "expo-router";
import { useBlurTargetReady, useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";
import { useSafeAreaInsets } from "react-native-safe-area-context";



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
      <BottomBarButtons />
    </View>
  );
};

/*function BottomBar_() {
  return (
    <View style={bottomBar.mainView}>
      <View style={bottomBar.view}>
        <BottomBarButton source="library" navigateTo="Library" />
        <BottomBarButton source="search" navigateTo="Search" />
        <BottomBarButton source="home" navigateTo="Home" />
        <BottomBarButton source="social" navigateTo="Social" />
        <BottomBarButton source="profile" navigateTo="Profile" />
      </View>
    </View>
  );
};*/

const height = 54;
const width = wp(92);
const indicatorWidth: number = width / 5;
const indicatorBase = rrect(rect(0, 1, indicatorWidth, 52), 24, 24);
const indicatorStroke = rrect(rect(0, 1, indicatorWidth, 52), 24, 24);
const r = rrect(rect(0, 0, width, height), 27, 27);
const mainStroke = rrect(rect(0, 0, width, height), 27, 27);

const TAB_OFFSET_X: Record<string, number> = {
  "/library": 1,
  "/search": indicatorWidth * 1,
  "/home": indicatorWidth * 2,
  "/social": indicatorWidth * 3,
  "/tab_profile": indicatorWidth * 4,
};

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 100,
  mass: 1.2,
};

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
  /*const scale = useDerivedValue(() => {
    //return withSpring(x.value === 0)
  });

  const matrix = useDerivedValue(() => {
    const m3 = Skia.Matrix();
    m3.translate(x.value, 0)
    return m3;
  });*/
  /*const dynamicBase = useDerivedValue(() => {
    return rrect(rect(x.value, 1, indicatorWidth, 52), 24, 24);
  });
  const dynamicStroke = useDerivedValue(() => {
    return rrect(rect(x.value, 1, indicatorWidth, 52), 24, 24);
  });*/

const SkiaBottomBar = memo(({ x }: any) => {

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <RoundedRect rect={r} style="stroke" strokeWidth={1} >
        <RadialGradient
          c={vec(width / 2, 0)}
          r={180}
          colors={["rgba(255, 255, 255, 0.5)", "rgba(220, 220, 220, 0.1)"]}
        />
      </RoundedRect>
      <RoundedRect rect={r} style="fill">
        <LinearGradient
          start={vec(5, 5)}
          end={vec(width / 2, 5)}
          colors={["rgba(0, 0, 0, 0.15)", "rgba(0, 0, 0, 0.08)"]}
        />
      </RoundedRect>
    </Canvas>
  );
});

function BottomBar() {
  const blurTarget = useBlurTargetRef();
  const isReadyToBlur = useBlurTargetReady();
  const tabX = useSharedValue(TAB_OFFSET_X["/home"]);
  const segments = useSegments();

  const handlePress = useCallback((route: any) => {
    const x = TAB_OFFSET_X[route];
    if (x) tabX.value = withSpring(x, SPRING_CONFIG);
  }, [segments]);

  const translateX = useAnimatedStyle(() => ({
    transform: [{ translateX: tabX.value }]
  }));

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles_.view, { bottom: insets.bottom || wp(2) }]}>
      {isReadyToBlur && <BlurView
        intensity={25}
        style={StyleSheet.absoluteFill}
        blurTarget={blurTarget}
        blurMethod="dimezisBlurView"
        tint="systemUltraThinMaterialDark"
      />}
      <SkiaBottomBar x={tabX} />
      <Animated.View
        style={[
          styles_.indicator,
          translateX
        ]}
      />
      <BottomBarButtons onPress={handlePress} />
    </View>
  )
};

export default memo(BottomBar);

const styles_ = StyleSheet.create({
  view: {
    width, height,
    position: "absolute",
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 27,
    borderWidth: 0,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderColor: "transparent",
  },
  indicator: {
    position: "absolute",
    top: 1,
    bottom: 1,
    height: 52,
    width: indicatorWidth,
    borderRadius: 24,
    //backgroundColor: "#202f45a0",
    backgroundColor: "#00000060",
    opacity: 0.8,
    borderWidth: 0.2,
    borderColor: "rgba(130, 130, 130, 0.5)",
  },
});

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

<Animated.View
      style={[
        {
          position: "absolute",
          top: 2,
          width: 76,
          height: 50,
          backgroundColor: "black",
        },
translateX,
      ]}
      />
        ////

    tabX.value = withTiming(offsetX, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
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
        <Group transform={skiaTransform}>
      <RoundedRect rect={indicatorBase} strokeWidth={1} color="rgba(180, 190, 190, 0.2)" />
      <RoundedRect rect={indicatorStroke} style="stroke" strokeWidth={0.1} />
</Group>
      </Canvas>
*/

/**
 * <RoundedRect rect={r}>
        <ColorMatrix
          matrix={[
            0.19, 0.587, 0.424, 0, 0,
            0.19, 0.587, 0.424, 0, 0,
            0.19, 0.587, 0.424, 0, 0,
            0, 0, 0, 0.1, 0
          ]}
        />
        <FractalNoise
          freqX={0.05}
          freqY={0.05}
          octaves={1}
        />
      </RoundedRect>
 */

/*
      <Group matrix={matrix}>
        <RoundedRect rect={indicatorBase}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, 52)}
            colors={[
              "rgba(255,255,255,0.48)",
              "rgba(255,255,255,0.12)",
              "rgba(255,255,255,0.06)",
            ]}
          />
          <Blur blur={1} />
        </RoundedRect>

        <RoundedRect rect={indicatorBase} >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(40, 52)}
            colors={[
              "rgba(255, 255, 255, 0.3)",
              "rgba(255, 255, 255, 0.2)",
              "rgba(255, 255, 255, 0.15)",
              "rgba(140, 140, 140, 0.1)",
            ]}
          />
          <Blur blur={1} />
        </RoundedRect>

        <RoundedRect
          rect={indicatorBase}
        >
          <LinearGradient
            start={vec(0, 0)}
            end={vec(5, 10)}
            colors={[
              "rgba(255,255,255,0.3)",
              "rgba(255,255,255,0.2)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0)"
            ]}
          />
        </RoundedRect>
        <RoundedRect
          rect={indicatorStroke}
          style="stroke"
          strokeWidth={0.5}
          color="rgba(255,255,255,0.25)"
        />
      </Group>>*/


