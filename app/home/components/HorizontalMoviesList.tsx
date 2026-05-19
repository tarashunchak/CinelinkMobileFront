import React, { useCallback, useEffect, useState } from "react";
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
  const [movies, setMovies] = useState<any[]>(Array.from({ length: 10 }));

  useEffect(() => {
    async function loadContent() {
      if (moviesList.length)
        setMovies([...moviesList])
    }
    loadContent();
  }, [moviesList]);

  const renderItem = useCallback(({ item }: any) => 
    <MovieCard
      data={{
        movie_id: item?.id,
        poster_path: item?.poster_path,
        inCinemas,
        maximum: item?.maximum,
        title: item?.title,
      }}
    />, [])

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={{paddingHorizontal: 4}}
      horizontal
      data={movies}
      keyExtractor={(item, _) => String(item?.id)}
      renderItem={renderItem}
      ListFooterComponent={<EmptyMovieCard onPress={() => { }} />}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    minHeight: 155,
    maxHeight: 165,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    paddingVertical: 4,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
    marginLeft: "-1%",
    marginRight: "-1%",
  },
  skeleton: {
    marginRight: 5,
    height: "99%",
    width: 100,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
  }
});