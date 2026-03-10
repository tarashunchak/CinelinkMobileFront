import React from "react";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { ImageBackground, View } from "react-native";
import { UserProfile_T } from "../types";
import { LogOutButton } from "./logOutButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
        style={styles.bg_img}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <ReturnArrowButton onPress={onBack} />
        <LogOutButton isVisible={isCurrentUser} />
      </View>
    </>
  );
};

const styles = {
  bg_img: {
    margin: "-2%",
    height: hp("36%"),
    width: "104%",
    position: "absolute",
    top: 0,
    left: 0,
  }
};