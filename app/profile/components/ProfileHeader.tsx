import React, { useRef } from "react";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { StyleSheet, View } from "react-native";
import { UserProfile_T } from "../types";
import { LogOutButton } from "./LogOutButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import HeaderContainer from "@/components/ui/header-container";
import { BlurTargetView, BlurView } from "expo-blur";

type Props = {
  bgUrl?: string;
  onBack: () => void;
  isCurrentUser: boolean;
};

export default function ProfileHeader({ bgUrl, onBack, isCurrentUser }: Props) {
  const ref = useRef<View | null>(null);
  return (
    <HeaderContainer>
      <BlurTargetView
        style={styles.bgImage}
        ref={ref}>
        <Image
          source={bgUrl
            ? { uri: bgUrl }
            : require("../assets/gradientBackground.jpg")}
          style={styles.bgImage}
          cachePolicy="disk"
        />
      </BlurTargetView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%", paddingHorizontal: "1%" }}>
        <ReturnArrowButton onPress={onBack} />
        <LogOutButton isVisible={isCurrentUser} />
      </View>
      <BlurView
        tint="systemChromeMaterialDark"
        intensity={30}
        style={styles.bgImage}
        blurReductionFactor={40}
        blurMethod="dimezisBlurView"
        blurTarget={ref}
      />
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: hp("35%"),
    width: wp(100),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  }
});