import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import BottomBar from "../bars/bottomBar";

export default function MeetUpScreen() {
  return (
    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>
      <Image
        style={{ height: "5%", width: "20%", marginLeft: "3%", marginTop: "3%" }}
        source={require("@/app/home/assets/logo.png")}
      />

      <TouchableOpacity style={{
        height: hp(40),
        width: hp(30),
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 0.5,
        borderRadius: 8,
        alignSelf: "center",
        top: hp(20),
      }}>

      </TouchableOpacity>
      <BottomBar />
    </ImageBackground>
  );
}