import React from "react";
import { StyleSheet, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";

export default function EmptyMovieCard({ onPress }: { onPress: () => void }) {
  return (
    <PressableScale
      onPress={onPress}
      style={styles.view}>
      <Image
        source={require("@/assets/images/threeDots.png")}
        style={styles.image}
        cachePolicy="disk"
      />
      <Text style={[textStyle.gray20]}>More</Text>
    </PressableScale>
  )
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "column",
    height: "99%",
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    padding: 0.5,
    gap: 10,
  },
  image: {
    height: 17,
    width: "70%",
  }
});