import { CURRENT_USER } from "@/api/currentUser";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";

export default function LibraryHeader() {
  const navigator = useNavigation();
  return (
    <View style={styles.view}>
      <View style={styles.left.view}>
        <Image style={styles.left.avatar} source={{ uri: useAuthStore.getState().user?.avatar_url }} />
        <Text style={styles.left.text}>Your watchlists</Text>
      </View>
      <View style={styles.right.view}>
        <TouchableOpacity>
          <Image style={styles.right.img} source={require("@/app/library/assets/icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigator.navigate("AddWatchlist")}>
          <Image style={styles.right.img} source={require("@/app/library/assets/plus.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  view: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    height: hp("12%"),
    width: widthPercentageToDP("100%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
    marginBottom: 15,
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