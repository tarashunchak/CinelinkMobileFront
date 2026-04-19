import React from "react";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { ImageBackground, StyleSheet, View } from "react-native";
import { UserProfile_T } from "../types";
import { LogOutButton } from "./LogOutButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

type Props = {
  user: UserProfile_T;
  onBack: () => void;
  isCurrentUser: boolean;
};

export function ProfileHeader({ user, onBack, isCurrentUser }: Props) {
  return (
    <>
      <ImageBackground
        source={user?.bg_img_url
          ? { uri: user?.bg_img_url }
          : require("@/assets/images/profileBackground.png")}
        style={styles.bgImage}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ReturnArrowButton onPress={onBack} />
        <LogOutButton isVisible={isCurrentUser} />
      </View>
    </>
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