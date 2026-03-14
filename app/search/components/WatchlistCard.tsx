import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"

interface WatchlistCard_I {
  watchlist_id: number;
  name: string;
  fg_img_url: string;
  movies_quantity: number;
  creator: string;
}

export default function WatchlistCard({ watchlist }: { watchlist: WatchlistCard_I }) {
  const navigator = useNavigation();
  console.warn(`Watchlist: ${watchlist}`)
  return (
    <TouchableOpacity style={styles.view}
      onPress={() => { }}>
      <View style={{ flexDirection: "row", gap: 5 }}>
        <Image source={
          watchlist?.fg_img_url ?
            { uri: watchlist?.fg_img_url }
            : require("@/app/library/assets/NoFgWatchlist.png")
        }
          style={styles.image} />
        <Text style={textStyle.white22}>{watchlist.name}</Text>
      </View>
      <Text style={textStyle.gray14}>
        {`${watchlist.movies_quantity} ${watchlist.movies_quantity === 1 ? "movie" : "movies"}`}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  view: {
    gap: 10,
    height: hp("15%"),
    width: "98%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: hp("0.5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  text: {

  },
  image: {
    height: "100%",
    width: "45%",
    resizeMode: "cover",
    borderRadius: 4,
  },

});