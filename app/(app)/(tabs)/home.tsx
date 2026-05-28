import GenresList from "@/src/components/ui/genres-list";
import { textStyle } from "@/styles/textStyles";
import React, { memo, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalMoviesList from "@/src/features/home/components/HorizontalMoviesList";
import MovieOfTheDay from "@/src/features/home/components/MovieOfTheDay";
import { Movie_I } from "@/src/features/home/models/movie";
import { LoadHomeCached, useHomeStore } from "@/src/features/home/cache";
import { heightPercentageToDP } from "react-native-responsive-screen";

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
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <MovieOfTheDay />

        <Text style={[textStyle.white22, styles.titleText]}>Now in Cinemas</Text>
        <HorizontalMoviesList
          moviesList={nowPlaying}
          inCinemas={true}
        />

        <Text style={[textStyle.white22, styles.titleText]}>Trending</Text>
        <HorizontalMoviesList
          moviesList={popular}
          inCinemas={false}
        />

        <Text style={[textStyle.white22, styles.titleText]}>Genres</Text>
        <GenresList setSelectedGenre={setSelectedGenre} />

      </ScrollView>
  )
})

export default memo(HomePageScreen);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollView: {
    backgroundColor: "transparent",
    paddingHorizontal: "1%",
    paddingBottom: heightPercentageToDP(9),
  },
  titleText: {
    marginTop: "5%",
  }
});
