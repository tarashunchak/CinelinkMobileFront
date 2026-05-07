import { textStyle } from "@/styles/textStyles";
import React from "react";
import { Linking, TouchableOpacity, View, Text, Image } from "react-native";
import { Movie } from "../../movie_details/types";
import { useNavigation } from "expo-router";
import GenresLayout from "./genresLayout";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";


export default function MovieCard({ movie }: { movie: Movie }) {
  const navigator = useNavigation();
  if (!movie) return <Skeleton height={118} width={"100%"} style={styles.backgroundStyle} />
  return (
    <PressableScale
      activeScale={0.98}
      style={[styles?.backgroundStyle]}
      onPress={() => {
        navigator?.push("MovieDetailScreen",
          { movieID: movie?.movie_id });
      }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
        style={styles.moviePosterStyle}
        pointerEvents="none"
      />
      <View style={{ flexDirection: "column", height: "100%", marginLeft: "4%", justifyContent: "space-evenly" }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Text style={styles.movieTitleStyle}
            pointerEvents="none"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {movie?.title}
          </Text>
          <Text
            style={[
              styles.movieYearStyle,
              textStyle.gray16
            ]}
            pointerEvents="none">
            {` (${movie?.release_date?.slice(0, 4)})`}
          </Text>
        </View>

        <TouchableOpacity style={styles.imdbText.view}
          onPress={async () => {
            const url = `https://www.imdb.com/title/${movie?.imdb_id}`;
            const sup = await Linking.canOpenURL(url);
            if (sup) Linking.openURL(url);
          }}
        >
          <Text style={styles.imdbText.text}>
            {`IMDb: ${movie?.imdb_rating?.toFixed(1)}`}
          </Text>
        </TouchableOpacity>

        <GenresLayout genres={movie?.genres} />
      </View>
    </PressableScale>
  );
};

const styles = {
  backgroundStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    height: 118,
    width: "100%",
    marginTop: "1.5%",
    borderRadius: 15,
    padding: "1%",
    paddingRight: "5%",
    paddingLeft: "5%",
    flexDirection: "row",
  },
  movieTitleStyle: {
    fontSize: 16,
    marginTop: "-1%",
    color: "white",
    fontFamily: "sans-serif-condensed",
    minWidth: "1%",
    maxWidth: "75%",
    textAlign: "left",
  },
  movieYearStyle: {
    fontSize: 16,
    marginTop: "-1%",
    color: "white",
    fontFamily: "sans-serif-condensed",
    textAlign: "left",
  },
  movieDirectorStyle: {
    fontSize: 12,
    color: "#ACACAC",
    fontFamily: "sans-serif-condensed",
    marginTop: 2,
  },
  imdbText: {
    view: {
      backgroundColor: "#deb522",
      height: 20,
      borderRadius: 4,
      width: 64,
      flexDirection: "column",
      justifyContent: "center"
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      color: "black",
      fontWeight: "bold",
    }
  },
  moviePosterStyle: {
    width: 73,
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
};