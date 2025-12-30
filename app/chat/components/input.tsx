import { textStyle } from "@/styles/textStyles";
import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";

export default function Input({ value }: { value: any }) {
  return (
    <View style={styles.view}>
      <TextInput style={styles.input} placeholder="Message" placeholderTextColor={"rgba(255, 255, 255, 0.3)"} />
    </View>
  );
};

const styles = {
  view: {
    width: "94%",
    height: "5%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: 999,
    paddingLeft: "5%",
    alignSelf: "center",
    zIndex: 2,
    marginBottom: "5%",
  },
  input: [textStyle.white18, {

  }]
}