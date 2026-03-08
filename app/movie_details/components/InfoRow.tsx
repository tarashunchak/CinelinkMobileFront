import React from "react";
import { View, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";

export default function InfoRow({ left, right }: { left: string, right: string | string[] }) {
  if (typeof (right) === "string") {
    return (
      <View style={styles.view}>
        <Text style={textStyle.yellow16}>{left}: </Text>
        <Text style={textStyle.white16}>{`${right}`}</Text>
      </View>
    )
  }

  return (
    <View style={styles.view}>
      <Text style={textStyle.yellow16}>{`${left}:`}</Text>
      <Text style={textStyle.white16}
        ellipsizeMode="tail">
        {
          right?.map(r => ` ${r} `)
        }
      </Text>
    </View>
  )
}

const styles = {
  view: {
    flexDirection: "row",
    maxWidth: "90%",
    marginTop: "1%",
  },

};