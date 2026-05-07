import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import { Image } from "expo-image";

export default function HeaderBlock({ watchlist }: { watchlist: any }) {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <View style={[styles.infoView]}>
          <Image
            source={
              watchlist?.fg_img_url ? { uri: watchlist?.fg_img_url }
                : require("@/app/library/assets/NoFgWatchlist.png")}
            style={styles.image}
            cachePolicy="memory"
          />

          <View style={styles.textView}>
            <Text style={[styles.nameText, textStyle.yellow22]}>
              {watchlist?.name}
            </Text>
            <Text
              style={[styles.descriptionText, textStyle.gray16]}
              pointerEvents="none"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {watchlist?.description}
            </Text>
            <TouchableOpacity
              style={styles.creatorTileView}
              onPress={() => navigator.navigate("UserProfileScreen", { userID: watchlist?.creator_id })}>
              <Text style={textStyle.gray14}>Creator:</Text>
              <Text style={textStyle.yellow14}>
                {watchlist?.creator_username}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[textStyle.gray14]}>
          {`${watchlist?.movies_quantity} ${watchlist?.movies_quantity === 1 ? "movie" : "movies"}`}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    height: hp("41%") - 50
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  creatorTileView: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 2,
    alignSelf: "flex-start",
  },
  descriptionText: {
    maxWidth: "75%",
    minWidth: "75%",
  },
  nameText: {
    maxWidth: "75%",
    minWidth: "75%",
  },
  image: {
    width: hp("13%"),
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#909090",
  },
  infoView: {
    height: hp("15%"),
    width: wp("100%"),
    backgroundColor: "rgba(255,255, 255, 0.05)",
    borderColor: "rgba(255,255, 255, 0.2)",
    borderWidth: 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: hp("1%"),
    gap: hp("2%"),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textView: {
    flexDirection: "column",
    justifyContent: "space-between",
  }
}); 