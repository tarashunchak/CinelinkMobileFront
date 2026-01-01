import BottomBar from "@/app/bars/bottomBar";
import GenresList from "@/components/ui/leafy-genres-list";
import { inputStyle } from "@/styles/inputStyle";
import { textStyle } from "@/styles/textStyles";
import React, { useCallback, useEffect } from "react";
import { Image, ImageBackground, ScrollView, Text, TextInput } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import PremiereCarousel from "./components/PremiereCarousel";
import HorizontalMoviesList from "./components/HorizontalFilmList";
import { useFocusEffect, useNavigation } from "expo-router";
import MovieOfTheDay from "./components/MovieOfTheDay";

export default function HomePageScreen() {
  const [selectedGenre, setSelectedGenre] = React.useState<number>(0);

  const navigation = useNavigation();
  return (

    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>
      <ScrollView
        style={{
          backgroundColor: "transparent",
          padding: "1%"
        }}
        showsVerticalScrollIndicator={false}
      >

        <MovieOfTheDay />

        <PremiereCarousel />

        <Text style={styles.text}>
          Trending
        </Text>
        <HorizontalMoviesList />

        <Text style={styles.text}>
          {"Genres"}
        </Text>
        <GenresList setSelectedGenre={setSelectedGenre} />

      </ScrollView>
      <BottomBar />
    </ImageBackground >
  );
}

const styles: object = {
  text: [
    textStyle.white22,
    { marginTop: "5%" }
  ]
}
//<FilmCardList selectedGenre={selectedGenre} />