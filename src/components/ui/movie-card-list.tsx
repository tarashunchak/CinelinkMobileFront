import { getMoviesByGenre, getPopularMovies, getSimilarMovies } from "@/api/tmdbApi";
import { getCurrentGenre, setCurrentGenre } from "@/utils/homePage";
import { nowPlayingMoviesId } from "@/utils/nowPlaying";
import { useNavigation } from "@react-navigation/native";
import React, { memo, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import MovieCard from "./movie-card";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Link, router, useFocusEffect } from "expo-router";

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
  posterPath?: string;
  title?: string;
}

export default function MovieCardList({ selectedGenre, movieID, movieGenre, posterPath, title }: MovieCardListParams) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(useCallback(() => {
    let cancelled = false;
    async function load() {
      setIsLoading(true);
      let data = await getSimilarMovies(movieID)
      if(!data)
        data = await getMoviesByGenre(movieGenre);
      if(!cancelled){
        setMovies(data ?? []);
        setIsLoading(false);
      }
    }
    load()
    return ()=>{
      cancelled = true;
      setMovies([]);
    };
  }, [movieID, movieGenre]));

  const handlePress = useCallback(()=>{
    router.push({
      pathname: "/(app)/similar_movies",
      params: {
        posterPath,
        movieID,
        title,
        genre: movieGenre,
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