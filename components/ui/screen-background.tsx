import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export default function ScreenBackground({ children }: any) {
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  }
});