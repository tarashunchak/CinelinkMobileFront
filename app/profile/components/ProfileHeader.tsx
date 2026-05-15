import React from "react";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { StyleSheet, View } from "react-native";
import { UserProfile_T } from "../types";
import { LogOutButton } from "./LogOutButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import HeaderContainer from "@/components/ui/header-container";

type Props = {
  bgUrl?: string;
  onBack: () => void;
  isCurrentUser: boolean;
};

export function ProfileHeader({ bgUrl, onBack, isCurrentUser }: Props) {
  return (
    <HeaderContainer>
      <Image
        source={bgUrl
          ? { uri: bgUrl }
          : require("../assets/profileBackground.png")}
        style={styles.bgImage}
        cachePolicy="memory-disk"
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "5%", paddingHorizontal: "1%" }}>
        <ReturnArrowButton onPress={onBack} />
        <LogOutButton isVisible={isCurrentUser} />
      </View>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: hp("36%"),
    width: wp(100),
    position: "absolute",
    top: 0,
    left: 0,
  }
});