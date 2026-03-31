import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function FloatingButton(
  { isVisible }: { isVisible: boolean }
) {
  return (
    isVisible &&
    <TouchableOpacity style={styles.view}>
      <Image source={require("@/assets/images/ReturnArrow.png")} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  view: {
    width: 48,
    height: 48,
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
})