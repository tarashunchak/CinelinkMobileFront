import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { GetHomeMovies } from "@/api/home/home";
import MovieCard from "./MovieCard";
import EmptyMovieCard from "./EmptyMovieCard";

export default function PremiereCarousel() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function loadMovies() {
      const data = await GetHomeMovies();
      if (data) {
        const movies: any[] = data;
        setMovies(movies?.now_playing);
      }
    }
    loadMovies();
  }, []);

  const maximum = movies?.dates?.maximum?.slice(5, 10);

  return (
    <View>
      <Text style={styles.text}>
        Now in cinemas
      </Text>
      <ScrollView
        style={[styles.scrollView]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {[
          movies?.results?.map((movie: any, index: number) =>
            <MovieCard
              key={index}
              data={{
                movie_id: movie?.id,
                poster_path: movie?.poster_path,
                inCinemas: true,
                maximum
              }} />)
          ,
          <EmptyMovieCard />
        ]}
      </ScrollView >
    </View>
  )
}

const styles = {
  text: [
    textStyle.white22,
    { marginTop: "15%" }
  ],
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