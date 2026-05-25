import { LoginRequest } from "@/api/auth";
import { backgroundStyle } from "@/styles/backgroundStyle";
import { buttonStyle } from "@/styles/buttonStyle";
import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { Keyboard, Image, Text, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import Input from "./components/Input";
import ScreenBackground from "@/src/components/ui/screen-background";
import { Link, useNavigation } from "expo-router";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import HeaderContainer from "@/src/components/ui/header-container";
import AuthBackground from "@/src/components/ui/authBackground";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSignIn = (text: string) => {

  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <HeaderContainer style={styles_.view}>
          <AnimatedFastImage
            source={require("@/assets/images/logo.png")}
            style={styles_.logo}
          />
          <Input
            placeholder="Username"
            text="Enter username"
            type="text"
            onChangeText={setUsername}
          />

          <Input
            placeholder="Password"
            text="Enter password"
            type="password"
            onChangeText={setPassword}
          />

          <PressableScale style={[buttonStyle.continueButton, styles_.signInBtn]}
            onPress={async () => { await LoginRequest({ username, password }) }}>
            <Text style={textStyle.white20}>
              Sign In
            </Text>
          </PressableScale>

          <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-evenly", alignContent: "center", margin: "6%" }}>
            <View style={styles_.halfLine} />
            <PressableScale>
              <Text style={textStyle.gray16}>
                Forgot password?
              </Text>
            </PressableScale>
            <View style={styles_.halfLine} />
          </View>

          <PressableScale style={styles_.googleBtn}
            onPress={() => onSignIn("google")}>
            <View style={styles_.googleBtnLayout}>
              <Image source={require("@/assets/images/google_icon.png")}
                style={styles_.googleIcon} />
              <Text style={[
                textStyle.black20,
                {
                  alignSelf: "center"
                }
              ]}>Sign In with Google</Text>
            </View>
          </PressableScale>
          <Link href="/registration" style={[ textStyle.white18, { marginTop:"5%" }]}>
            Create account?
          </Link>
        </HeaderContainer>
      </TouchableWithoutFeedback>
  );
}

const styles_ = StyleSheet.create({
  view: {
    paddingHorizontal: "2%",
    alignItems: "center",
    marginTop: "20%",
  },
  logo: {
    height: "24%",
    width: "65%",
  },
  signInBtn: {
    width: "100%",
    borderRadius: 8,
    marginTop: "10%",
    backgroundColor: "#DEB522",
  },
  halfLine: {
    backgroundColor: "white",
    height: 0.5,
    width: "20%",
    alignSelf: "center",
  },
  googleBtn: {
    width: "100%",
    height: 48,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  googleBtnLayout: {
    flexDirection: "row",
    gap: "1%",
    justifyContent: "center",
    alignContent: "center",
  },
  googleIcon: {
    alignSelf: "center",
    width: 36,
    height: 36,
  },
});

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
