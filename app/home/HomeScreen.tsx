import BottomBar from "@/app/bars/bottomBar";
import GenresList from "@/components/ui/leafy-genres-list";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, Text } from "react-native";
import HorizontalMoviesList from "./components/HorizontalMoviesList";
import MovieOfTheDay from "./components/MovieOfTheDay";
import { GetHomeMovies } from "@/api/home/home";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

interface Movies_I {
  popular: any[],
  now_playing: any[],
}

export default function HomePageScreen() {
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const [movies, setMovies] = useState<Movies_I>();

  useEffect(() => {
    async function load() {
      const data = await GetHomeMovies();
      if (data) setMovies(data);
    };
    load();
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={[]}>
        <StatusBar hidden />
        <ImageBackground source={require("@/assets/images/background.png")}
          style={{
            flex: 1,
            backgroundColor: "black",
          }}
        >
          <ScrollView
            style={{
              backgroundColor: "transparent",
              padding: "1%"
            }}
            showsVerticalScrollIndicator={false}
          >
            <MovieOfTheDay />

            <Text style={styles.text}>
              Now in Cinemas
            </Text>
            <HorizontalMoviesList
              moviesList={movies?.now_playing}
              inCinemas={true}
            />

            <Text style={styles.text}>
              Trending
            </Text>
            <HorizontalMoviesList
              moviesList={movies?.popular}
              inCinemas={false}
            />

            <Text style={styles.text}>
              Genres
            </Text>
            <GenresList setSelectedGenre={setSelectedGenre} />

          </ScrollView>
          <BottomBar />

        </ImageBackground >
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = {
  text: [
    textStyle.white22,
    { marginTop: "5%" }
  ]
}