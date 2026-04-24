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
                style={[
                    inputStyle.defaultInput,
                    {
                        marginTop: 5
                    }
                ]}
                placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
                placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: "100%",
        flexDirection: "column",
        marginTop: "5%"
    }
});