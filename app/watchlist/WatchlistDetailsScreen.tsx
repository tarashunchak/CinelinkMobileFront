import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, ScrollView, View, TouchableOpacity } from "react-native";
import BottomBar from "@/app/bars/bottomBar";
import { GetWatchlistMovies } from "@/api/watchlist/watchlist";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import HeaderBlock from "./components/HeaderBlock";
import MoviesList from "./components/MoviesList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreenBackground from "@/components/ui/screen-background";

export default function WatchlistDetailsScreen({ route }: any) {
  const [movies, setMovies] = useState<any>();
  const watchlist = route?.params?.watchlist;

  const navigator = useNavigation();
  useEffect(() => {
    async function loadWatchlistMovies() {
      const movies = await GetWatchlistMovies(watchlist?.id);
      setMovies(movies);
    }
    loadWatchlistMovies();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScreenBackground>
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={require("@/app/library/assets/NoBgWatchlist.jpeg")}
            style={styles.bgImage}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: hp(1),
              }}
            >
              <LeafyReturnArrowButton onPress={() => navigator.goBack()} />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: hp(1.5),
                  paddingLeft: hp(0.5),
                  paddingBottom: 0
                }}>
                <Image source={require("@/app/watchlist/assets/InfoIcon.png")}
                  style={[{ height: 26, width: 26 }]} />
              </TouchableOpacity>
            </View>

            <HeaderBlock watchlist={watchlist} />

          </ImageBackground>
          <MoviesList movies={movies} />
        </ScrollView >
        <BottomBar />
      </ScreenBackground>
    </GestureHandlerRootView>
  )
}


const styles = {
  bgImage: {
    height: hp("45%"),
    width: "100%",
    marginBottom: hp("1%")
  },

}