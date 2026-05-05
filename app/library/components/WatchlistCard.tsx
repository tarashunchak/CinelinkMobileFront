import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";

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
    <PressableScale style={styles.card.view}
      onPress={() => { navigator.navigate("WatchlistDetailsScreen", { watchlist: watchlist }) }}>
      <View style={{ width: "80%", height: "100%", flexDirection: "row" }}>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Image source={
            watchlist?.fg_img_url ?
              { uri: watchlist?.fg_img_url }
              : require("@/app/library/assets/NoFgWatchlist.png")
          }
            style={styles.card.image}
            cachePolicy="memory-disk"
          />

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
          </View>
        </View>
        <Text style={styles.card.movies_quantity}>
          {`${watchlist.movies_quantity} ${watchlist.movies_quantity === 1 ? "movie" : "movies"}`}
        </Text>
      </View>
    </PressableScale>
  );
};

const styles = {
  card: {
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
    image: {
      height: "100%",
      width: "35%",
      resizeMode: "cover",
      borderRadius: 4,
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 1,
    },
    text: {
      view: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1%",
      },
      name: [textStyle.white22, {

      }],
      description: [textStyle.gray16, {
        maxWidth: "70%",
        minWidth: "70%",
      }],
      creator: {
        view: {
          flexDirection: "row",
          gap: 5,
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 3,
          padding: 4,
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