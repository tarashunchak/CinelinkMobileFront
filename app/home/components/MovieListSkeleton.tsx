import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { textStyle } from "@/styles/textStyles";

export default function MovieListSkeleton() {
  return (
    <View style={{ flexDirection: "row" }}>
      {Array.from({ length: 10 })?.map((value: any, index: number) =>
        <View
          key={index}
          style={styles.view}
        />
      )}
    </View>
  )
}

const styles = {
  view: {
    flexDirection: "column",
    height: "99%",
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 0.5,
  },
  image: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignSelf: "center"
  }
};