import { getPopularMovies } from "@/api/tmdbApi";
import { useNavigation } from "expo-router";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, ScrollView } from "react-native";
import { GetHomeMovies } from "@/api/home/home";
import MovieCard from "./MovieCard";

export default function HorizontalMoviesList() {
  const navigator = useNavigation();
  const [movies, setMovies] = useState<any>();

  useEffect(() => {
    async function loadmovies() {
      const data = await GetHomeMovies();
      setMovies(data?.popular);
      return;
    }
    console.log("same genre pressed — no reload");

    loadmovies();
  }, []);

  return (
    <ScrollView
      style={[styles.scrollView]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {
        movies?.map((movie: any, index: number) => <MovieCard
          data={{
            movie_id: movie?.id,
            poster_path: movie?.poster_path,
            inCinemas: false,
            maximum: null
          }}
        />)
      }
    </ScrollView >
  )
}

const styles = {
  scrollView: {
    height: 160,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 4,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
    marginLeft: "-1%",
    marginRight: "-1%",
  },
  view: {
    marginRight: 5,
    width: 100,
    height: "99%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: 4,
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 4
  },
  info: {
    view: {
      position: "absolute",
      top: "3%",
      width: "100%",
      backgroundColor: "rgba(50, 158, 79, 0.9)",
      borderWidth: 0.5,
      borderColor: "rgba(255, 255, 255, 0.4)"
    },
    text: [
      textStyle.white10,
      {
        textTransform: "uppercase",
        textAlign: "center",
        alignSelf: "center"
      }
    ]
  }
}