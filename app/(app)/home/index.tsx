import GenresList from "@/components/ui/leafy-genres-list";
import { textStyle } from "@/styles/textStyles";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalMoviesList from "./components/HorizontalMoviesList";
import MovieOfTheDay from "./components/MovieOfTheDay";
import { GetHomeMovies } from "@/api/home/home";
import { Movie_I } from "./models/movie";
import ScreenBackground from "@/components/ui/screen-background";
import BottomBar from "../bars/bottomBar";
import { BlurTargetView } from "expo-blur";
import { LoadHomeCached, useHomeStore } from "./cache";
import { Stack } from "expo-router";
import { enableFreeze, freezeEnabled } from "react-native-screens";

interface Movies_I {
  popular: Movie_I[],
  now_playing: Movie_I[],
};

function HomePageScreen() {
  return (
    <View style={{ flex: 1 }}>
      <HomeContent />
    </View>
  );
};

const HomeContent = memo(() => {
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const movies = useHomeStore(s => s.movies);

  const nowPlaying = useMemo(() => movies?.now_playing, [movies?.now_playing]);
  const popular = useMemo(() => movies?.popular, [movies?.popular]);

  async function load() {
    await LoadHomeCached();
  };
  load()

  return (
    <Stack.Screen
      options={{
        freezeOnBlur: true,
      }}
    >
      <ScrollView
        style={stylesR.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <MovieOfTheDay />

        <Text style={[textStyle.white22, stylesR.titleText]}>Now in Cinemas</Text>
        <HorizontalMoviesList
          moviesList={nowPlaying}
          inCinemas={true}
        />

        <Text style={[textStyle.white22, stylesR.titleText]}>Trending</Text>
        <HorizontalMoviesList
          moviesList={popular}
          inCinemas={false}
        />

        <Text style={[textStyle.white22, stylesR.titleText]}>Genres</Text>
        <GenresList setSelectedGenre={setSelectedGenre} />

      </ScrollView>
    </Stack.Screen>
  )
})

export default memo(HomePageScreen);

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
