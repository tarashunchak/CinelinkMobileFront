import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { textStyle } from "@/styles/textStyles";
import { getCurrentUserID } from "@/utils/utils";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import HeaderContainer from "@/src/components/ui/header-container";

export default function LibraryHeader() {
  const router = useRouter();
  return (
    <HeaderContainer style={stylesR.view}>
      <View style={styles.left.view}>
        <PressableScale
          activeScale={0.9}
          onPress={() => router.navigate({
            pathname: "/profile",
          })}
        >
          <Image
            style={styles.left.avatar}
            source={{ uri: useAuthStore.getState().user?.avatar_url }}
          />
        </PressableScale>
        <Text style={styles.left.text}>
          Your watchlists
        </Text>
      </View>
      <View style={styles.right.view}>
        <PressableScale>
          <Image style={styles.right.img} source={require("@/assets/images/icon.png")} />
        </PressableScale>
        <PressableScale onPress={() => router.push({pathname: "/add_watchlist",})}>
          <Image style={styles.right.img} source={require("@/assets/images/plus.png")} />
        </PressableScale>
      </View>
    </HeaderContainer>
  );
};

const stylesR = StyleSheet.create({
  view: {
    backgroundColor: "#222831",
    zIndex: 3,
    width: widthPercentageToDP("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    elevation: 10,
  },
});

const styles = {
  view: {
    backgroundColor: "rgba(90, 90, 90, 1)",
    height: hp("12%"),
    width: widthPercentageToDP("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
  },
  left: {
    view: {
      flexDirection: "row",
      gap: 10,
    },
    avatar: {
      height: hp(6.5),
      width: hp(6.5),
      borderRadius: hp(6.5)/2,
      backgroundColor: "white",
    },
    text: [textStyle.white26, {
      alignSelf: "center",
    }],
  },
  right: {
    view: {
      flexDirection: "row",
      gap: 20,

    },
    img: {
      height: 30,
      width: 30,
    }
  }
}