import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { textStyle } from "@/styles/textStyles";

const { width: screenW, height: screenH } = Dimensions.get("window");

export default function LeafyInput(
  {
    text = "",
    placeholder = "",
    rect = undefined,
    value = undefined,
    onChangeText = undefined,
    style = {},
    maxLenght = 100
  }) {

  if (rect && rect.w && typeof rect.w == "string" && rect.w.includes("%")) {
    rect.w = parseFloat(rect.w) * (screenW / 100.0);
  }
  if (rect && rect.h && typeof rect.h == "string" && rect.h.includes("%")) {
    rect.h = parseFloat(rect.h) * (screenH / 100.0);
  }

  if (rect && rect.y && typeof rect.y == "string" && rect.y.includes("%")) {
    rect.y = parseFloat(rect.y) * (screenH / 100.0);
  }
  if (rect && rect.x && typeof rect.x == "string" && rect.x.includes("%")) {
    rect.x = parseFloat(rect.x) * (screenW / 100.0);
  }

  let transform = [];
  if (rect && rect.x === "centered" && rect.w) {
    rect.x = "50%";
    transform.push({ translateX: -(rect.w / 2) });
  }
  if (rect && rect.y === "centered" && rect.h) {
    rect.y = "50%";
    transform.push({ translateY: -(rect.h / 2) });
  }

  const finalStyle = rect ?
    {
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: rect.w,
      transform,
    } : {};

  return (
    <View style={finalStyle}>
      <Text style={[textStyle.white14, styles.headerText]}>{text}</Text>
      <TextInput style={styles.view} value={value}
        onChangeText={onChangeText} 
        placeholder={placeholder} 
        maxLength={maxLenght}
        placeholderTextColor="rgba(255, 255, 255, 0.4)" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    color: "white",
    fontSize: 16,
    height: 48,
    paddingLeft: 20,
    backgroundColor: "rgba(255, 255,255, 0.08)",
    borderRadius: 8,
    padding: 0.5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  headerText: {
    marginBottom: 3,
    marginLeft: 3,
  },
});