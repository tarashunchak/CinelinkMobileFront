import React from "react";
import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { PressableScale } from "react-native-pressable-scale";

export default function FloatingButton(
  { isVisible }: { isVisible: boolean }
) {
  return (
    isVisible &&
    <PressableScale
      style={styles.view}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      }}
    >
      <Image
        style={styles.arrow}
        cachePolicy="memory-disk"
        source={require("../assets/arrow-left.png")}
      />
    </PressableScale>
  )
}

const styles = StyleSheet.create({
  view: {
    width: 46,
    height: 46,
    position: "absolute",
    bottom: hp(10),
    right: hp(3),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgb(50, 50, 50)",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    width: 42,
    height: 42,
  },
})