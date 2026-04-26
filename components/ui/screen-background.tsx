import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import React from "react";
import { ImageBackground, KeyboardAvoidingView, StyleSheet } from "react-native";

export default function ScreenBackground({ children }: any) {
  return (
    <ImageBackground
      source={useAuthStore?.getState()?.isAuthenticated ?
        require("../../assets/images/background.png")
        : require("../../assets/images/authBackground.png")}
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