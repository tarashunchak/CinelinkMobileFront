import React from "react";
import { StyleSheet, Text, TextInput,  View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { inputStyle } from "@/styles/inputStyle";

export default function Input({text, placeholder, onChangeText}
    :{text:string, placeholder: string,onChangeText:(args:any)=>void}
){

    return (
        <View style={styles.view}>
            <Text style={[textStyle.white18, { marginLeft: "1%" }]}>{text}</Text>
            <TextInput onChangeText={onChangeText}
              secureTextEntry
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
    view:{
        flexDirection: "column",
        marginTop: "5%" 
    }
});