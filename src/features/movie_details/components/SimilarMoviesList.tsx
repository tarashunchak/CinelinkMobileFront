import { getSimilarMovies } from "@/api/tmdbApi";
import HorizontalMoviesList from "@/src/components/ui/horizontal-movies-list";
import MovieCard from "@/src/components/ui/MovieCard";
import { textStyle } from "@/styles/textStyles";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function SimilarMoviesList({ movieID }: { movieID: number }) {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getSimilarMovies(movieID);
      if (data) setMovies(data);
    };
    load();
  }, [movieID]);

  //const renderItem = useCallback(({ item }: any) => <MovieCard data={item} />, [])
  return (
    <View>
      <Text style={[styles.title, textStyle.yellow20]}>Similar movies</Text>
      <HorizontalMoviesList moviesList={movies} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: "2%",
    marginTop: "5%",
  },
  view: {
    height: 0,
  },
  flatLIst: {

  },
});

/*<View style={styles.view}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item: any, index: number) => `movie-${item.movie_id}`}
      />
    </View>
*/