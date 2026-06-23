import GenresList from "@/src/components/ui/genres-list";
import { textStyle } from "@/styles/textStyles";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import HorizontalMoviesList from "@/src/components/ui/horizontal-movies-list";
import MovieOfTheDay from "@/src/features/home/components/MovieOfTheDay";
import { LoadHomeCached, useHomeStore } from "@/src/features/home/cache";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import UsersCarousel from "@/src/components/ui/users-carousel";

const SECTIONS = [
  { type: "Now in Cinemas" },
  { type: "Trending" },
  { type: "Genres" },
  { type: "Following suggestions" },
];

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

function HomeContent() {
  const [selectedGenre, setSelectedGenre] = useState<number>(0);
  const movies = useHomeStore(s => s.movies);

  const nowPlaying = movies?.now_playing;
  const popular = movies?.popular;

  const trendingSection = useMemo(() => (
    <>
      <Text style={[textStyle.white22, styles.titleText]}>Trending</Text>
      <HorizontalMoviesList
        moviesList={popular}
        inCinemas={false}
      />
    </>
  ), [popular]);

  const nowInCinemasSection = useMemo(() => (
    <>
      <Text style={[textStyle.white22, styles.titleText]}>Now in Cinemas</Text>
      <HorizontalMoviesList
        moviesList={nowPlaying}
        inCinemas={true}
      />
    </>
  ), [nowPlaying]);

  const renderItem = useCallback(({ item }: any) => {
    switch (item.type) {
      case "Now in Cinemas":
        return nowInCinemasSection;
      case "Trending":
        return trendingSection;
      case "Genres":
        return (<>
          <Text style={[textStyle.white22, styles.titleText]}>Genres</Text>
          <GenresList setSelectedGenre={setSelectedGenre} />
        </>)
      case "Following suggestions":
        return (<View style={{marginTop: 0, paddinTop: 0,}}>
          <Text style={[textStyle.white22, styles.titleText]}>Following suggestions</Text>
          <UsersCarousel />
        </View>)
    }
  }, [trendingSection, nowInCinemasSection]);

  return (
    <FlatList
      data={SECTIONS}
      keyExtractor={(_: any, index: number) => String(index)}
      renderItem={renderItem}
      ListHeaderComponent={<MovieOfTheDay />}
      contentContainerStyle={{ paddingBottom: hp(9) }}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    />
  )
};

export default memo(HomePageScreen);

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: "1%",
    paddingBottom: hp(9),
  },
  titleText: {
    marginTop: hp("2.5%"),
  },
  logo: {
    height: 40,
    aspectRatio: 2,
  },
});
