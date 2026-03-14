import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function MovieCard({ movie }: { movie: any }) {
  const navigator = useNavigation();

  let img_uri;

  if (movie?.poster_path)
    img_uri = movie?.poster_path;
  else if (movie?.profile_path)
    img_uri = movie?.profile_path;

  return (
    <TouchableOpacity style={styles.view}
      onPress={() => { navigator.navigate("MovieDetailScreen", { movieID: movie?.id }) }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image style={styles.poster} source={{ uri: `https://image.tmdb.org/t/p/w300/${img_uri}` }} />
        <View style={styles.info.view}>
          <Text
            style={styles.info.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{movie?.title || movie?.name}</Text>
          <View style={styles.info.imdb.view}>
            <Text style={styles.info.imdb.text}>{`IMDb: ${movie?.vote_average?.toFixed(2)}`}</Text>
          </View>
          <Text style={textStyle.gray14}>3 friends watched</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", justifyContent: "space-between" }}>
        <View>
          <Image style={styles.actions} source={require("@/app/search/assets/addToLib.png")} />
        </View>
        <View>
          <Image style={styles.actions} source={require("@/app/search/assets/remove.png")} />
        </View>
      </View>
    </TouchableOpacity >
  )
}

const styles = {
  view: {
    width: "100%",
    height: 76,
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
    height: "100%",
    aspectRatio: 0.7,
  },
  info: {
    view: {
      flexDirection: "column",
      justifyContent: "space-evenly",
    },
    title: [
      textStyle.yellow18,
      {
        maxWidth: "85%",
        minWidth: "85%",
      }
    ],
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
};