import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { buttonStyle } from "@/styles/buttonStyle";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import Input from "./components/Input";
import ScreenBackground from "@/components/ui/screen-background";
import { useNavigation } from "expo-router";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { PressableScale } from "react-native-pressable-scale";

export default function RegistrationScreen() {
  const [fullName, setFullName] = useState("");
  //const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigation();

  return (
    <ScreenBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ padding: "2%" }}>
          <ReturnArrowButton style={{ marginTop: "8%" }}
            onPress={navigator.goBack}
          />

          <Text style={[textStyle.white36, { marginTop: "16%", alignSelf: "center", textAlign: "center" }]}>Create Your Cinelink Account</Text>
          <Text style={[textStyle.gray18, { alignSelf: "center" }]}>All your entertainment in one place</Text>

          <View style={{ flexDirection: "column", marginTop: "5%" }}>
            <Input
              placeholder="Enter full name"
              text="Full Name"
              type="text"
              onChangeText={(text) => setFullName(text)}
            />
            <Input
              placeholder="Enter email"
              text="Email address"
              type="text"
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              placeholder="Enter password"
              text="Password"
              type="text"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <PressableScale style={[buttonStyle.continueButton, { width: "100%", borderRadius: 8, marginTop: "8%" }]}
            onPress={() => { LoginRequest(login, password) }}>
            <Text style={[textStyle.white20]}>
              Continue
            </Text>
          </PressableScale>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    position: "relative",
    backgroundColor: "#181725",
  },
  main: {
    width: "100%",
    height: "100%",
  },
});