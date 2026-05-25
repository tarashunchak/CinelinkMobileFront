import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { buttonStyle } from "@/styles/buttonStyle";
import React, { useState } from "react";
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Text, View, Pressable } from "react-native";
import Input from "./components/Input";
import ScreenBackground from "@/src/components/ui/screen-background";
import { useNavigation } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";
import { LoginRequest, RegistrationRequest } from "@/api/auth";
import HeaderContainer from "@/src/components/ui/header-container";

export default function RegistrationScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigation();

  return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
      >
        <HeaderContainer
          style={{ flex: 1, paddingHorizontal: "2%" }}
        >
          <ReturnArrowButton />

          <Text style={[textStyle.white36, { marginTop: "10%", alignSelf: "center", textAlign: "center" }]}>
            Create Your Cinelink Account
          </Text>
          <Text style={[textStyle.gray18, { alignSelf: "center" }]}>
            All your entertainment in one place
          </Text>

          <View style={{ flexDirection: "column", marginTop: "5%" }}>
            <Input
              placeholder="Enter username"
              text="Username"
              type="text"
              onChangeText={setUsername}
            />
            <Input
              placeholder="Enter email"
              text="Email address"
              type="text"
              onChangeText={setEmail}
            />
            <Input
              placeholder="Enter password"
              text="Password"
              type="text"
              onChangeText={setPassword}
            />
          </View>

          <PressableScale style={[buttonStyle.continueButton, { width: "100%", borderRadius: 8, marginTop: "15%", backgroundColor: "#DEB522" }]}
            onPress={async () => {
              const result = await RegistrationRequest({
                username,
                password,
                email,
              })
              if (result !== 0) {
                await LoginRequest({
                  username,
                  password,
                });
                navigator.navigate("LoginScreen")
              }
            }}>
            <Text style={[textStyle.white20]}>
              Sign Up
            </Text>
          </PressableScale>
        </HeaderContainer>
      </TouchableWithoutFeedback>
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