import React from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function AuthBackground({ children }: any ) {
  return (
      <View style={styles.background}>
        <Image
          source={require("@/assets/images/authBackground.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="disk"
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