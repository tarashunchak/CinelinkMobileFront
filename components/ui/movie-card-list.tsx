import { getMoviesByGenre, getPopularMovies, getSimilarMovies } from "@/api/tmdbApi";
import { getCurrentGenre, setCurrentGenre } from "@/utils/homePage";
import { nowPlayingMoviesId } from "@/utils/nowPlaying";
import { movieCardStyle } from "@/styles/movieCardStyle";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { textStyle } from "../../styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import MovieCard from "./movie-card";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  vote_average: Float;
  poster_path: string;
  directors: string[];
  release_date: string;
  providers: any;
  imdb_id: string;
}

interface MovieCardListParams {
  selectedGenre: number | any;
  movieID: number | any;
  movieGenre: number | any;
}

export default function MovieCardList({ selectedGenre, movieID, movieGenre }: MovieCardListParams) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadmovies() {
      console.warn("prevGenre: ", getCurrentGenre(), "\n");
      console.warn("current: ", selectedGenre, "\n");

      if (movieID) {
        const data = await getSimilarMovies(movieID) || await getMoviesByGenre(movieGenre);

        setMovies(data);
        return;
      } else {
        if (getCurrentGenre() !== selectedGenre || !selectedGenre) {

          setCurrentGenre(selectedGenre);

          const data = getCurrentGenre() ? await getMoviesByGenre(getCurrentGenre()) : await getPopularMovies();
          if (data) setMovies(data);

          return;
        }
      }
      console.log("same genre pressed — no reload");
    }
    loadmovies()
  }, [selectedGenre, movieID]);


  return (
    <View style={styles.mainView}>
      {
        movies?.map((movie, index) =>
        (
          nowPlayingMoviesId.includes(movie?.id) ?
            null
            :
            <MovieCard movie={movie} key={index} />
        )
        )}
    </View>
  )
};

const styles = StyleSheet.create({
  mainView: {
    position: "relative",
    backgroundColor: "transparent",
    marginTop: "2%",
    marginBottom: hp(Platform.OS === "ios" ? "10%" : "7.8%")
  }
});