import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";

export type Watchlist = {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creator_username: string;
  fg_img_url: string;
  bg_img_url: string;
  is_public: boolean;
  movies_quantity: number;
};

export default function WatchlistCard({ watchlist }: { watchlist: Watchlist }) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity style={styles.card.view}
      onPress={() => { navigator.navigate("WatchlistDetailsScreen", { watchlist: watchlist }) }}>
      <Image source={
        watchlist?.fg_img_url ?
          { uri: watchlist?.fg_img_url }
          : require("@/app/library/assets/NoFgWatchlist.png")
      }
        style={styles.card.image} />
      <View style={styles.card.text.view}>
        <Text style={styles.card.text.name}>{watchlist.name}</Text>
        <Text style={styles.card.text.description}
          pointerEvents="none"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {watchlist.description}
        </Text>
        <View style={styles.card.text.creator.view}>
          <Text style={styles.card.text.creator.header}>Creator:</Text>
          <Text style={styles.card.text.creator.name}>{watchlist?.creator_username}</Text>
        </View>
        <Text style={styles.card.movies_quantity}>
          {`${watchlist.movies_quantity} ${watchlist.movies_quantity === 1 ? "movie" : "movies"}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  card: {
    view: {
      gap: 10,
      height: hp("15%"),
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
      padding: hp("0.5%"),
      flexDirection: "row",
    },
    image: {
      height: "100%",
      width: "30%",
      resizeMode: "cover",
      borderRadius: 4,
    },
    text: {
      view: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1%",
      },
      name: [textStyle.yellow22, {

      }],
      description: [textStyle.gray16, {
        maxWidth: "75%",
        minWidth: "75%",
      }],
      creator: {
        view: {
          flexDirection: "row",
          gap: 5,
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: 3,
          padding: 2,
          paddingLeft: 4,
          paddingRight: 4,
          alignSelf: "flex-start",
        },
        header: [textStyle.gray14, {

        }],
        name: [textStyle.yellow14, {

        }],
      }
    },
    movies_quantity: [textStyle.gray14, {

    }],
  }
}