import { textStyle } from "@/styles/textStyles";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Button() {
  return (
    <PressableScale style={styles.button}>
      <Text style={[textStyle.black20, styles.text]}>Continue</Text>
    </PressableScale>
  )
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: wp(80),
    backgroundColor: "#DEB522",
    borderRadius: 8,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    alignSelf: "center",
  },
});