import { getMovieOfTheDay } from "@/api/tmdbApi";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Image, ImageBackground } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function MovieOfTheDay() {
  const navigator = useNavigation();
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function loadMovie() {
      const data = await getMovieOfTheDay();
      setMovie(data);
      console.log("movie of the day: ", data);
    }

    loadMovie();
  }, [])

  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}` }}
      style={styles.view}>
      <View style={{ height: "100%", width: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <Text style={[textStyle.white38, { alignSelf: "center", marginTop: "8%" }]}>{"Movie of the day"}</Text>
        <TouchableOpacity style={{}}
          onPress={() => navigator.navigate("MovieDetailScreen", { movieId: movie?.movie_id })}>
          <Text style={[textStyle.white24, { textAlign: "center", alignSelf: "center", maxWidth: wp("80%"), minWidth: wp("70%") }]}
            numberOfLines={1}
            ellipsizeMode="tail">{movie?.title}</Text>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} style={styles.poster} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = {
  view: {
    height: hp("45%"),
    margin: "-2%",
  },
  poster: {
    marginTop: "2%",
    height: "80%",
    width: "45%",
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5
  },
  imdb: {
    view: {
      backgroundColor: "#DEB522",
      width: 80,
      height: 27,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      right: 0,
    },
    text: [textStyle.black16, {
      alignSelf: "center",
      textAlign: "center",
    }]
  },
}