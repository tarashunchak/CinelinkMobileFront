import MovieCardList from "@/components/ui/leafy-film-list";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, Image, ImageBackground, ScrollView, View, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "../bars/bottomBar";
import { GetWatchlistMovies } from "@/api/watchlist/watchlist";
import MovieCard from "./components/movieCard";
import { Movie } from "../MovieDetailsPage/types";
import { Watchlist } from "../WatchlistsLibraryPage/components/watchlistCard";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";

export type WatchlistMovie = {
  imdb_id: string;
  title: string;
  imdb_rating: number;
  poster_path: string;
  genres: number[];
}

export type WatchlistDetails = {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creator_username: string;
  fg_image_url: string;
  bg_image_url: string;
  is_public: boolean;
  movies_quantity: number;
  movies: WatchlistMovie[];
};

export default function WatchlistDetailsScreen({ route }: any) {
  const [watchlistMovies, setWatchlistMovies] = useState<any>();
  const watchlist = route?.params?.watchlist;

  useEffect(() => {
    async function loadWatchlistMovies() {
      const movies = GetWatchlistMovies(watchlist?.id);
      const details = [watchlist, { movies }];
      console.log("details: ", details);
      setWatchlistMovies(details);
    }
    loadWatchlistMovies();
  }, []);

  return (
    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={require("@/app/screens/WatchlistsLibraryPage/assets/NoBgWatchlist.jpeg")} style={{ height: hp("45%"), width: "100%" }} >
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <Image source={require("@/app/screens/WatchlistDetailsPage/assets/InfoIcon.png")}
              style={[{ height: 26, width: 26, margin: hp("2%") }]} />
          </TouchableOpacity>
          <View style={{ justifyContent: "flex-end", height: hp("41%") - 26 }}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
              <View style={[styles.info.view]}>
                <Image source={watchlist?.fg_img_url ? { uri: watchlist?.fg_img_url } : require("@/app/screens/WatchlistsLibraryPage/assets/NoFgWatchlist_2.png")} style={styles.info.image} />

                <View style={styles.card.text.view}>
                  <Text style={styles.card.text.name}>{watchlist?.name}</Text>
                  <Text style={styles.card.text.description}
                    pointerEvents="none"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {watchlist?.description}
                  </Text>
                  <View style={styles.card.text.creator.view}>
                    <Text style={styles.card.text.creator.header}>Creator:</Text>
                    <Text style={styles.card.text.creator.name}>{watchlist?.creator_username}</Text>
                  </View>
                </View>
              </View>
              <Text style={[textStyle.gray14, {}]}>
                {`${watchlist?.movies_quantity} ${watchlist?.movies_quantity === 1 ? "movie" : "movies"}`}
              </Text>
            </View>
          </View>
        </ImageBackground>
        {
          watchlistMovies?.map((item: Movie, index: number) => <MovieCard key={index} movie={item} />)
        }
      </ScrollView >
      <BottomBar />
    </ImageBackground >
  )
}


const styles = {
  info: {
    view: {
      height: hp("15%"),
      width: wp("100%"),
      backgroundColor: "rgba(255,255, 255, 0.05)",
      borderColor: "rgba(255,255, 255, 0.2)",
      borderWidth: 0.8,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      padding: hp("1%"),
      gap: hp("2%"),
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    image: {
      width: hp("13%"),
      aspectRatio: 1,
      borderRadius: 4,
    }
  },
  card: {
    view: {
      gap: 10,
      height: hp("15%"),
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
      padding: hp("0.5%"),
      flexDirection: "row",
    },
    image: {
      height: "100%",
      width: "30%",
      resizeMode: "cover",
      borderRadius: 4,
    },
    text: {
      view: {
        flexDirection: "column",
        gap: 2,
      },
      name: [textStyle.yellow22, {

      }],
      description: [textStyle.gray16, {
        maxWidth: "75%",
        minWidth: "75%",
      }],
      creator: {
        view: {
          flexDirection: "row",
          gap: 5,
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 2,
          alignSelf: "flex-start",
        },
        header: [textStyle.gray14, {

        }],
        name: [textStyle.yellow14, {

        }],
      }
    }
  }
}