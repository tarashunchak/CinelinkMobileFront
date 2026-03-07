import React from "react";
import { Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";

export default function OverviewBlock({ text }: { text: string }) {
  return (
    <View style={styles.view}>
      <Text style={textStyle.yellow20}>Overview</Text>
      <Text style={styles.text}>
        {text}
      </Text>
    </View>
  )
}

const styles = {
  view: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
    flexDirection: "column"
  },
  text: [
    textStyle.white16,
    {
      width: "100%",
      textAlign: "justify",
    },
  ]
};