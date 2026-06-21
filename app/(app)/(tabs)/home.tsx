import GenresList from "@/src/components/ui/genres-list";
import { textStyle } from "@/styles/textStyles";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import HorizontalMoviesList from "@/src/features/home/components/HorizontalMoviesList";
import MovieOfTheDay from "@/src/features/home/components/MovieOfTheDay";
import { Movie_I } from "@/src/features/home/models/movie";
import { LoadHomeCached, useHomeStore } from "@/src/features/home/cache";
import { heightPercentageToDP as hp, widthPercentageToDP } from "react-native-responsive-screen";
import UsersCarousel from "@/src/components/ui/users-carousel";
import Spacer from "@/src/components/ui/spacer";
import { useFocusEffect } from "expo-router";

interface Movies_I {
  popular: Movie_I[],
  now_playing: Movie_I[],
};

function HomePageScreen() {
  useEffect(() => {
    async function load() {
      await LoadHomeCached();
    };
    load();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HomeContent />
    </View>
  );
};

const SECTIONS = [
  { type: "Header" },
  { type: "Movie of the day" },
  { type: "Now in Cinemas" },
  { type: "Tranding" },
  { type: "Genres" },
  { type: "Following suggestions" },
];

const HomeContent = memo(() => {
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const movies = useHomeStore(s => s.movies);

  const nowPlaying = useMemo(() => movies?.now_playing, [movies?.now_playing]);
  const popular = useMemo(() => movies?.popular, [movies?.popular]);

  const renderItem = useCallback(({ item }: any) => {
    switch (item.type) {
      case "Movie of the day":
        return <MovieOfTheDay />;
      case "Now in Cinemas":
        return (
          <>
            <Text style={[textStyle.white22, styles.titleText]}>Now in Cinemas</Text>
            <HorizontalMoviesList
              moviesList={nowPlaying}
              inCinemas={true}
            />
          </>
        )
      case "Tranding":
        return (<>
          <Text style={[textStyle.white22, styles.titleText]}>Trending</Text>
          <HorizontalMoviesList
            moviesList={popular}
            inCinemas={false}
          />
        </>)
      case "Genres":
        return (<>
          <Text style={[textStyle.white22, styles.titleText]}>Genres</Text>
          <GenresList setSelectedGenre={setSelectedGenre} />
        </>)
      case "Following suggestions":
        return (<>
          <Text style={[textStyle.white22, styles.titleText]}>Following suggestions</Text>
          <UsersCarousel />
        </>)
    }
  }, []);

  return (
    <FlatList
      data={SECTIONS}
      keyExtractor={(_: any, index: number) => String(index)}
      renderItem={renderItem}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(8)} />}
      showsVerticalScrollIndicator={false}
    />
  )
})

export default memo(HomePageScreen);

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: "1%",
    paddingBottom: hp(9),
  },
  titleText: {
    marginTop: "5%",
  },
  header: {
    width: widthPercentageToDP(100),
    //backgroundColor: "black", 
    backgroundColor: "#0C0C0C",
    top: 0, left: 0, right: 0,
    position: "absolute", zIndex: 3,
    paddingBottom: "2%",
    elevation: 10,
  },
  logo: {
    height: 40,
    aspectRatio: 2,
  },
});
