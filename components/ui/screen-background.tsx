import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import React from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function ScreenBackground({ children }: any) {
  return (
    <View style={styles.background}>
      <Image
        source={
          useAuthStore?.getState()?.isAuthenticated ?
            require("../../assets/images/background.png")
            : require("../../assets/images/authBackground.png")
        }
        style={{ ...StyleSheet.absoluteFillObject }}
        contentFit="cover"
        cachePolicy="memory-disk"
      />
      <View style={{ flex: 1 }}>
        {children}

      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
});