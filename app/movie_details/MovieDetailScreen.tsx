import { getDetailedMovieByID } from "@/api/tmdbApi";
import BottomBar from "@/app/bars/bottomBar";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MovieCardList from "@/components/ui/leafy-film-list";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "./types";
import MainInfo from "./components/MainInfo";
import DetailsBlock from "./components/DetailsBlock";
import OverviewBlock from "./components/OverviewBlock";
import ActionButtonsBlock from "./components/ActionButtonsBlock"; import GenresBlock from "./components/GenresBlock";
import ProvidersBlock from "./components/ProvidersBlock";
import TrailerBlock from "./components/TrailerBlock";
import CreditCardsList from "./components/CreditCardsList";
import { GetMovieDirectors } from "./services/services";

export default function MovieDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<Movie>();
  console.log("Movie ID in moviedetailsscreen: ", route?.params?.movieId || 13);

  const inCinemas: boolean = route?.params?.inCinemas;
  const maximum = route?.params?.maximum;

  useEffect(() => {
    async function loadMovieDetails() {
      const data: Movie = await getDetailedMovieByID(route?.params?.movieId || 13);
      if (!data) return;
      data.directors = GetMovieDirectors(data?.credits?.crew);
      setMovie(data);
    }
    loadMovieDetails();
  }, []);

  const trailerKey = movie?.videos?.results?.find(
    video => video.site === "YouTube" && video.type === "Trailer"
  )?.key;

  return (
    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ padding: "1%" }}>
        <MainInfo movie={movie} inCinemas={inCinemas} />
        <ActionButtonsBlock movieID={movie?.id} />
        <GenresBlock genres={movie?.genres} />
        <ProvidersBlock providers={movie?.providers} />
        <TrailerBlock trailerKey={trailerKey} />
        <OverviewBlock text={movie?.overview} />
        <DetailsBlock movie={movie} />

        <Text style={styles.title}>Cast</Text>
        <CreditCardsList credits={movie?.credits.cast} />

        <Text style={styles.title}>Crew</Text>
        <CreditCardsList credits={movie?.credits.crew} />

        <Text style={styles.title}>Similar movies</Text>
        <MovieCardList
          navigation={navigation}
          movieID={movie?.id}
          movieGenre={movie?.genres[0]?.id}
        />
      </ScrollView >
      <BottomBar />
    </ImageBackground >
  );
}

function emptyCreditCard(credits: any, poster_path: any) {
  const navigation = useNavigation();
  return (<TouchableOpacity
    key={7}
    onPress={() => navigation.push("MovieCreditsScreen", { credits: credits, poster: poster_path })}
    style={[{
      flexDirection: "column",
      height: 175,
      width: 110,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      margin: 1.5,
      marginRight: 5,
      justifyContent: "center",
      alignItems: "center",
      padding: 0.5,
    }]}>
    <Image source={require("@/assets/images/threeDots.png")}
      style={{ height: 20, width: 20, borderTopLeftRadius: 6, borderTopRightRadius: 6, alignSelf: "center" }} />
    <Text style={[textStyle.gray20]}>More</Text>
  </TouchableOpacity>
  )
}

const styles = {
  mainScrollView: {
    flex: 1,
    padding: "2.5%",
    paddingTop: 0,
  },
  sectionView: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
  },
  ImageBackground: {
    height: hp("40%"),
    width: "104%",
    marginLeft: "-3%",
    marginRight: "-3%",
    marginTop: "-25%"
  },
  title: [
    textStyle.yellow20,
    {
      marginLeft: "2%",
      marginTop: "5%",
    }
  ],
};