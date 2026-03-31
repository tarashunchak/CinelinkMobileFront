import { getMovieOfTheDay } from "@/api/tmdbApi";
import { textStyle } from "@/styles/textStyles";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { TouchableOpacity, Text, View, Image, ImageBackground } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function MovieOfTheDay() {
  const navigator = useNavigation();
  const [movie, setMovie] = useState();

  useFocusEffect(
    useCallback(() => {
      async function loadMovie() {
        const data = await getMovieOfTheDay();
        setMovie(data);
      }

      loadMovie();
    }, [])
  )

  return (
    <ImageBackground
      source={{
        uri: `https://image.tmdb.org/t/p/w300${movie?.backdrop_path
          || movie?.poster_path}`
      }}
      style={styles.backdrop}>
      <View style={styles.background}>

        <Image
          style={styles.logo}
          source={require("@/app/home/assets/logo.png")}
        />

        <Text
          style={
            [textStyle.white38,
            styles.text]
          }>
          {"Movie of the day"}
        </Text>
        <TouchableOpacity style={{}}
          onPress={() =>
            navigator?.navigate("MovieDetailScreen",
              { movieID: movie?.movie_id }
            )
          }>
          <View style={styles.view}>
            <Text
              style={[
                textStyle.white24,
                styles.text
              ]}
              numberOfLines={1}
              ellipsizeMode="tail">{movie?.title}</Text>
            <Text style={textStyle.white24}>
              {`(${movie?.release_date?.slice(0, 4)})`}
            </Text>
          </View>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie?.poster_path}` }}
            style={styles.poster} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = {
  logo: {
    height: "10%",
    width: "20%",
    marginLeft: "3%",
    marginTop: "3%"
  },
  backdrop: {
    height: hp("45%"),
    margin: "-2%",
    marginBottom: hp(5)
  },
  background: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  view: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 5,
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    maxWidth: wp("80%")
  },
  poster: {
    marginTop: "2%",
    height: "80%",
    width: "45%",
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5
  },
}