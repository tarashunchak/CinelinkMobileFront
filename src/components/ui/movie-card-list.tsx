import { getMoviesByGenre, getPopularMovies, getSimilarMovies } from "@/api/tmdbApi";
import { getCurrentGenre, setCurrentGenre } from "@/utils/homePage";
import { nowPlayingMoviesId } from "@/utils/nowPlaying";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import MovieCard from "./movie-card";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Link, router } from "expo-router";

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
  posterPath?: string,
}

export default function MovieCardList({ selectedGenre, movieID, movieGenre, posterPath }: MovieCardListParams) {
  const [movies, setMovies] = useState<Movie[]>([]);

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

  const handlePress = useCallback(()=>{
    router.push({
      pathname: "/(app)/similar_movies",
      params: {
        posterPath,
        movieID,
      },
    });
  }, [movieID]);

  return (
    <View style={styles.mainView}>
      {
        movies?.map((movie, index) =>(
            <MovieCard movie={movie} key={movie?.imdb_id} />
        ))
      }
      <View style={styles.lineContainer}>
        <View style={styles.halfLine} />
        <PressableScale onPress={handlePress}>
          <Text style={textStyle.gray18}>
            Show more
          </Text>
        </PressableScale>
        <View style={styles.halfLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "transparent",
    marginTop: "2%",
    alignItems:"center",
  },
  lineContainer: { 
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "space-evenly", 
    alignContent: "center", 
    margin: "3%",
  },
  halfLine: {
    backgroundColor: "white",
    height: 0.5,
    width: "20%",
    alignSelf: "center",
  },
});