import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";
import { Movie_I } from "../models/movie";
import EmptyMovieCard from "./EmptyMovieCard";

export default function HorizontalMoviesList(
  { moviesList, inCinemas }:
    {
      moviesList: Movie_I[],
      inCinemas: boolean
    }
) {
  const [movies, setMovies] = useState<Movie_I[]>(Array.from({ length: 10 }));

  useEffect(() => {
    async function load() {
      setMovies(moviesList)
    }
    load();
  }, [moviesList]);

  return (
    <FlatList
      style={styles.flatList}
      horizontal
      data={movies}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => (
        item ?
          <MovieCard
            data={{
              movie_id: item?.id,
              poster_path: item?.poster_path,
              inCinemas,
              maximum: null,
            }}
          /> : <EmptyMovieCard />
      )
      }
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
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
});