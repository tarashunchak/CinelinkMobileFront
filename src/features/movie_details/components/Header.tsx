import React from "react";
import { View, StyleSheet } from "react-native";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { textStyle } from "@/styles/textStyles";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";

export default function Header({ title, ref, movieID }: any) {
  const insets = useSafeAreaInsets();
  return (
    <BlurView
      blurTarget={ref}
      style={[styles.listHeader, { paddingTop: insets.top }]}
      blurMethod="dimezisBlurView"
      intensity={30}
      tint="systemUltraThinMaterialDark"
    >
      <View style={{ justifyContent: "center" }}>
        <ReturnArrowButton />
        <AnimatedFastText
          sharedTransitionTag={`movie-${movieID}-title`}
          style={[textStyle.white30, styles.titleStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </AnimatedFastText>
      </View>
    </BlurView>
  )
};

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  listView: {
    flex: 1,
    backgroundColor: "rgba(2, 1, 1, 0.8)"
  },
  headerView: {

  },
  listHeader: {
    //backgroundColor: "black",
    paddingHorizontal: "1%",
    paddingVertical: "3%",
    width: wp(100),
    elevation: 5,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
  contentContainer: {
    paddingHorizontal: "2%",
    paddingBottom: hp("5%"),
    paddingTop: hp("14%"),
  },
  titleStyle: {
    width: wp(70),
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    fontWeight: "bold",
  },
});