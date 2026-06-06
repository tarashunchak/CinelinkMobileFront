import React, { memo, useState } from "react";
import { View, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export let getActiveTab = () => { };

function SocialPageTopBar({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const tabs = ["Chats", "Recommendations", "Activity", "Friends"];
  const [activeTab, setActiveTab] = useState("Chats");

  /*const offsetX = useSharedValue<number>(0);

  const animatedStyle = useAnimatedStyle(()=>({
    transform: [{translateX: offsetX.value}]
  }));*/

  return (
    <View style={styles.mainContainer}>
      {
        tabs.map((tab, index) => (
          <PressableScale
            key={tab}
            onPress={
              () => {
                setActiveTab(tab);
                onTabChange(tab);
                offsetX.value = withSpring(index)
              }
            }
            style={[
              styles.buttonView,
              activeTab === tab && styles.activeButtonView,
            ]}
          >
            <Text style={[textStyle.white18, {fontWeight: "bold"}]}>{tab}</Text>
          </PressableScale>
        ))
      }
    </View>
  );
};

/*<Animated.View
        style={[styles.buttonView, styles.activeButtonView, {position: "absolute", zIndex: 1}, animatedStyle]}
      />*/

export default memo(SocialPageTopBar);

const styles = StyleSheet.create({
  mainContainer: {
    height: 52,
    width: "100%",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5%",
    backgroundColor: "#222831",
    elevation: 10,
  },
  buttonView: {
    paddingLeft: "2%",
    paddingRight: "2%",
    height: "98%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButtonView: {
    backgroundColor: "#2D3C59",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    borderWidth: 0.5,
    elevation: 5,
  },
});