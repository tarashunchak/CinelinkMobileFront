import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { textStyle } from "@/styles/textStyles";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import HeaderContainer from "@/src/components/ui/header-container";
import { Plus, Search } from "lucide-react-native";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";

export default function LibraryHeader() {
  const onPress = useCallback(()=>{ 
    router.navigate({
      pathname: "/profile",
    })
  }, []);
  return (
    <HeaderContainer style={stylesR.view}>
      <View style={styles.left.view}>
        <PressableScale
          activeScale={0.9}
          onPress={onPress}
        >
          <AnimatedFastImage
            style={styles.left.avatar}
            source={{ uri: useAuthStore.getState().user?.avatar_url }}
            sharedTransitionTag={`user-${useAuthStore.getState().user?.user_id}-avatar`}
            cachePolicy="disk"
          />
        </PressableScale>
        <Text style={styles.left.text}>
          Your watchlists
        </Text>
      </View>
      <View style={styles.right.view}>
        <PressableScale style={{ justifyContent: "center", alignItems: "center" }} onPress={() => router.push({ pathname: "/add_watchlist", })}>
          <Search size={34} color="white" strokeWidth={1} />
        </PressableScale>
        <PressableScale style={{ justifyContent: "center", alignItems: "center" }} onPress={() => router.push({ pathname: "/add_watchlist", })}>
          <Plus size={38} color="white" strokeWidth={1} />
        </PressableScale>
      </View>
    </HeaderContainer>
  );
};

const stylesR = StyleSheet.create({
  blur: {
    elevation: 5,
  },
  view: {
    backgroundColor: "#222831",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    elevation: 5,
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
      minHeight: 50,
      maxHeight: 60,
      aspectRatio: 1,
      borderRadius: hp(6.5) / 2,
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