import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { textStyle } from "@/styles/textStyles";
import { getCurrentUserID } from "@/utils/utils";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import HeaderContainer from "@/components/ui/header-container";

export default function LibraryHeader() {
  const navigator = useNavigation();
  return (
    <HeaderContainer style={stylesR.view}>
      <View style={styles.left.view}>
        <PressableScale
          activeScale={0.9}
          onPress={() => navigator?.navigate(
            "UserProfileScreen", {
              userID: getCurrentUserID()
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
          <Image style={styles.right.img} source={require("@/app/library/assets/icon.png")} />
        </PressableScale>
        <PressableScale onPress={() => navigator.navigate("AddWatchlist")}>
          <Image style={styles.right.img} source={require("@/app/library/assets/plus.png")} />
        </PressableScale>
      </View>
    </HeaderContainer>
  );
};

const stylesR = StyleSheet.create({
  view: {
    backgroundColor: "rgba(90, 90, 90, 1)",
    width: widthPercentageToDP("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    elevation: 100,
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
      height: hp("8"),
      width: hp("8%"),
      borderRadius: 999,
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