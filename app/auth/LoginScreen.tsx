import { LoginRequest } from "@/api/auth";
import { backgroundStyle } from "@/styles/backgroundStyle";
import { buttonStyle } from "@/styles/buttonStyle";
import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { Keyboard, Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import Input from "./components/Input";
import ScreenBackground from "@/components/ui/screen-background";
import { useNavigation } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigator = useNavigation();

  const onSignIn = () => {

  };

  return (
    <ScreenBackground>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ paddingHorizontal: "2%", alignItems: "center", marginTop: "20%" }}>
          <Image source={require("@/assets/images/logo.png")}
            style={[
              {
                height: "24%",
                width: "65%",
              }
            ]} />
          <Input
            placeholder="Username"
            text="Enter username"
            type="text"
            onChangeText={(text) => setUsername(text)}
          />

          <Input
            placeholder="Password"
            text="Enter password"
            type="password"
            onChangeText={(text) => setPassword(text)}
          />

          <PressableScale style={[buttonStyle.continueButton, { width: "100%", borderRadius: 8, marginTop: "10%", backgroundColor: "#DEB522" }]}
            onPress={() => { LoginRequest({ username, password }) }}>
            <Text style={[textStyle.white20]}>
              Sign In
            </Text>
          </PressableScale>

          <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", alignContent: "center", margin: "6%" }}>
            <View style={[
              {
                backgroundColor: "white",
                height: 0.5,
                width: "20%",
                alignSelf: "center"
              }
            ]} />
            <PressableScale>
              <Text style={textStyle.gray16}>Forgot password?</Text>
            </PressableScale>
            <View style={[
              {
                backgroundColor: "white",
                height: 0.5,
                width: "20%",
                alignSelf: "center"
              }
            ]} />
          </View>

          <PressableScale style={[styles.googleButton.touchable]}
            onPress={() => onSignIn("google")}>
            <View style={[styles.googleButton.view]}>
              <Image source={require("@/assets/images/google_icon.png")}
                style={{
                  alignSelf: "center",
                  width: 36,
                  height: 36
                }} />
              <Text style={[
                textStyle.black20,
                {
                  alignSelf: "center"
                }
              ]}>Sign In with Google</Text>
            </View>
          </PressableScale>

          <PressableScale style={{ marginTop: "5%" }}
            onPress={() => {
              navigator.navigate("RegistrationScreen")
            }}
          >
            <Text style={textStyle.white18}>Create account?</Text>
          </PressableScale>
        </View>
      </TouchableWithoutFeedback>
    </ScreenBackground>
  );
}

const styles = {
  container: {
    padding: 0,
    position: "relative",
    backgroundColor: backgroundStyle.darkBlueBackground.backgroundColor,
  },
  darkRect: {
    width: wp("102%"),
    marginLeft: "-1%",
    height: hp("100%"),
    paddingLeft: "4%",
    paddingRight: "4%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  main: {
    width: "100%",
    height: "100%",
  },
  googleButton: {
    touchable: {
      width: "100%",
      height: 48,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    view: {
      flexDirection: "row",
      gap: "1%",
      justifyContent: "center",
      alignContent: "center"
    }
  },
  appleButton: {
    touchable: {
      width: "100%",
      height: 48,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      marginTop: "5%"
    },
    view: {
      flexDirection: "row",
      gap: "1%",
      justifyContent: "center",
      alignContent: "center"
    }
  },
};
