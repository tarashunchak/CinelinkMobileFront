import { getPopularMovies } from "@/api/tmdbApi";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, ScrollView } from "react-native";
import { nowPlaying } from "./styles";

export default function HorizontalMoviesList() {
  const navigator = useNavigation();
  const [movies, setMovies] = useState<any>();

  useEffect(() => {
    async function loadmovies() {
      const data = await getPopularMovies();
      setMovies(data);
      return;
    }
    console.log("same genre pressed — no reload");

    loadmovies();
  }, []);

  return (
    <ScrollView style={[nowPlaying.scrollView]} horizontal={true} showsHorizontalScrollIndicator={false}>
      {
        movies?.map((movie: any, index: number) =>
        (
          <TouchableOpacity key={index} style={[nowPlaying.item]}
            onPress={() => { navigator.navigate("MovieDetailScreen", { movieId: movie?.id }) }}>
            <Image source={{ uri: "https://image.tmdb.org/t/p/w200" + movie?.poster_path }} style={{ width: "100%", height: "100%", borderRadius: 4 }} />
          </TouchableOpacity>
        )
        )
      }
    </ScrollView >
  )
}

