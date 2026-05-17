import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { inputStyle } from "@/styles/inputStyle";

export default function Input({ text, placeholder, onChangeText, type = "text" }
  : { text: string, placeholder: string, onChangeText: (args: any) => void, type: string }
) {

  return (
    <View style={styles.view}>
      <Text style={[textStyle.white18, { marginLeft: "1%" }]}>{text}</Text>
      <TextInput onChangeText={onChangeText}
        secureTextEntry={type === "password"}
        style={styles.textInput}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        placeholder={placeholder} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flexDirection: "column",
    marginTop: "5%"
  },
  textInput: {
    width: "100%",
    color: "white",
    fontSize: 16,
    height: 48,
    paddingLeft: 20,
    backgroundColor: "rgba(255, 255,255, 0.05)",
    borderRadius: 8,
    padding: 0.5,
    borderWidth: 0.6,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginTop: 5
  },
});