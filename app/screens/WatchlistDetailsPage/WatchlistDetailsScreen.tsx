import MovieCardList from "@/components/ui/leafy-film-list";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "../bars/bottomBar";
import { GetWatchlistMovies } from "@/api/watchlist/watchlist";
import MovieCard from "./components/movieCard";
import { Movie } from "../MovieDetailsPage/types";
import { Watchlist } from "../WatchlistsLibraryPage/components/watchlistCard";

export type WatchlistMovie = {
  imdb_id: string;
  title: string;
  vote_average: number;
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

export default function WatchlistDetailsScreen({ watchlist }: { watchlist: Watchlist }) {
  const [watchlistMovies, setWatchlistMovies] = useState<any>();

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
        <View style={{ height: heightPercentageToDP("45%"), width: "100%" }}>
          <ImageBackground source={require("@/assets/images/collections/50comedyTop.png")} style={{ width: "100%", height: "100%" }} >
            <LeafyReturnArrowButton style={{ marginTop: "5%", marginLeft: "2%", zIndex: 2 }} onPress={() => useNavigation()?.goBack()} />
          </ImageBackground>
        </View>
        {
          watchlistMovies?.map((item: Movie, index: number) => <MovieCard key={index} movie={item} />)
        }
      </ScrollView>
      <BottomBar />
    </ImageBackground>
  )
}