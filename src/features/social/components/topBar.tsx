import React, { memo, useCallback, useRef, useState } from "react";
import { View, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { widthPercentageToDP } from "react-native-responsive-screen";
import HeaderContainer from "@/src/components/ui/header-container";

export let getActiveTab = () => { };

let TAB_OFFSET_X = [
  {
    name: "Chats",
    offset: 0,
    width: 0,
  },
  {
    name: "Recommendations",
    offset: 0,
    width: 0,
  },
  {
    name: "Activity",
    offset: 0,
    width: 0,
  },
  {
    name: "Friends",
    offset: 0,
    width: 0,
  },
];

function SocialPageTopBar({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const tabs = ["Chats", "Recommendations", "Activity", "Friends"];
  const [activeTab, setActiveTab] = useState("Chats");
  const layouts = useRef<Record<string, {x: number; width: number}>>({});
  const isReady = useRef(false);

  const offsetX = useSharedValue<number>(0);
  const sliderWidth = useSharedValue<number>(0);
  const radius = useSharedValue<number>(4);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
    width: sliderWidth.value,
    borderRadius: radius.value,
  }));

  return (
    <HeaderContainer style={styles.view}>
      <View style={styles.mainContainer}>
      <Animated.View style={[styles.buttonView, styles.activeButtonView, animatedStyle]} />
      {
        TAB_OFFSET_X.map(({ name, offset, width }: any, index) => (
          <PressableScale
            key={name}
            onPress={
              () => {
                setActiveTab(name);
                onTabChange(name);
                radius.value = 14;
                offsetX.value = withSpring(layouts.current[name].x)
                sliderWidth.value = withSpring(layouts.current[name].width, {}, ()=>{
                  radius.value = withSpring(4);
                })
              }
            }
            style={[
              styles.buttonView,
            ]}
            onLayout={(event) => {
              if(isReady.current) return;

              layouts.current[name] = {
                x: event.nativeEvent.layout.x,
                width: event.nativeEvent.layout.width,
              };
              if(name === activeTab){
                offsetX.value = withSpring(event.nativeEvent.layout.x)
                sliderWidth.value = withSpring(event.nativeEvent.layout.width)
              }

              isReady.current = false;
            }}
          >
            <Text style={[textStyle.white18, { fontWeight: "bold" }]}>{name}</Text>
          </PressableScale>
        ))
      }
</View>
    </HeaderContainer>
  );
};

/*<Animated.View
        style={[styles.buttonView, styles.activeButtonView, {position: "absolute", zIndex: 1}, animatedStyle]}
      />*/

export default memo(SocialPageTopBar);

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#2D3C59",
    borderRadius: 6,
    elevation: 5,
  },
  mainContainer: {
    width: "100%",
    alignSelf: "center",
    borderWidth: 0.2,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5%",
    backgroundColor: "#222831",
  },
  buttonView: {
    paddingLeft: "2%",
    paddingRight: "2%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButtonView: {
    //backgroundColor: "#2D3C59",
    backgroundColor: "#ffffff10",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    borderWidth: 0.5,
    position: "absolute",
    height: "96%",
  },
});