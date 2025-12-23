import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function MovieCard(/*{ movie }: { movie: any }*/) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity style={styles.card.view}
      onPress={() => { navigator.navigate("MovieDetailScreen", { movieId: 12 }) }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image style={styles.card.poster} source={{ uri: "https://image.tmdb.org/t/p/w300/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg" }} />
        <View style={styles.card.info.view}>
          <Text style={styles.card.info.title}>Ant Man</Text>
          <View style={styles.card.info.imdb.view}>
            <Text style={styles.card.info.imdb.text}>IMDb: 8.2</Text>
          </View>
          <Text style={textStyle.gray14}>3 friends watched</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
        <View>
          <Image style={styles.card.actions} source={require("@/app/search/assets/addToLib.png")} />
        </View>
        <View>
          <Image style={styles.card.actions} source={require("@/app/search/assets/remove.png")} />
        </View>
      </View>
    </TouchableOpacity >
  )
}

const styles = {
  card: {
    view: {
      width: "100%",
      height: 74,
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 0.5,
      borderRadius: 6,
      paddingLeft: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    poster: {
      height: 72,
      width: (72 * 0.66),
    },
    info: {
      view: {
        flexDirection: "column",
        justifyContent: "space-evenly",
      },
      title: textStyle.yellow18,
      imdb: {
        view: {
          backgroundColor: "#DEB522",
          width: 54,
          height: 18,
          borderRadius: 4,
          alignItems: "center",
          justifyContent: "center",
        },
        text: [textStyle.black12, {
          alignSelf: "center",
          textAlign: "center",
        }]
      },
    },
    actions: {
      width: 32,
      height: 32,
    },
  }
};