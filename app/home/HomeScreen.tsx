import SVGBottomBar from "@/app/bars/bottomBar";
import GenresList from "@/components/ui/leafy-genres-list";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalMoviesList from "./components/HorizontalMoviesList";
import MovieOfTheDay from "./components/MovieOfTheDay";
import { GetHomeMovies } from "@/api/home/home";
import { Movie_I } from "./models/movie";
import ScreenBackground from "@/components/ui/screen-background";
import BottomBar from "@/app/bars/bottomBar";
import { BlurTargetView } from "expo-blur";

interface Movies_I {
  popular: Movie_I[],
  now_playing: Movie_I[],
};

export default function HomePageScreen() {
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const [movies, setMovies] = useState<Movies_I>({
    popular: [],
    now_playing: [],
  });

  useEffect(() => {
    async function load() {
      const data = await GetHomeMovies();
      if (data) setMovies(data);
    };
    load();
  }, [])

  const ref = useRef<View | null>(null);

  return (
<>
<BlurTargetView
      style={{flex:1}}
      ref={ref}
    >
          <ScreenBackground>
        <ScrollView
          style={stylesR.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <MovieOfTheDay />

          <Text style={[textStyle.white22, stylesR.titleText]}>Now in Cinemas</Text>
          <HorizontalMoviesList
            moviesList={movies.now_playing}
            inCinemas={true}
          />

          <Text style={[textStyle.white22, stylesR.titleText]}>Trending</Text>
          <HorizontalMoviesList
            moviesList={movies.popular}
            inCinemas={false}
          />

          <Text style={[textStyle.white22, stylesR.titleText]}>Genres</Text>
          <GenresList setSelectedGenre={setSelectedGenre} />

        </ScrollView>
      </ScreenBackground>
    </BlurTargetView>
        <BottomBar blurTarget={ref} />
        </>
  );
}

const stylesR = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    backgroundColor: "transparent",
    paddingHorizontal: "1%"
  },
  titleText: {
    marginTop: "5%",
  }
});
