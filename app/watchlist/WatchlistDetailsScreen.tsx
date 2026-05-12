import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import BottomBar from "@/app/bars/bottomBar";
import { GetWatchlistMovies } from "@/api/watchlist/watchlist";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import HeaderBlock from "./components/HeaderBlock";
import ScreenBackground from "@/components/ui/screen-background";
import { Image } from "expo-image";
import { PressableScale } from "react-native-pressable-scale";
import MovieCard from "./components/MovieCard";
import { textStyle } from "@/styles/textStyles";
import Spacer from "@/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";

export default function WatchlistDetailsScreen({ route }: any) {
  const watchlist = route?.params?.watchlist;
  const [movies, setMovies] = useState<any[]>(Array.from({ length: watchlist.movies_quantity }));

  const navigator = useNavigation();
  useEffect(() => {
    async function loadWatchlistMovies() {
      const movies = await GetWatchlistMovies(watchlist?.id);
      if (movies?.length) setMovies(movies);
    }
    loadWatchlistMovies();
  }, []);

  return (
    <ScreenBackground>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => String(item?.imdb_id ?? index)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Image
              source={require("@/app/library/assets/NoBgWatchlist.jpeg")}
              style={[{ ...StyleSheet.absoluteFillObject }, styles.bgImage]}
              cachePolicy="memory-disk"
            />
            <View style={styles.buttonsRow}>
              <ReturnArrowButton onPress={navigator.goBack} />
              <PressableScale style={styles.infoBtnView}>
                <Image
                  source={require("@/app/watchlist/assets/InfoIcon.png")}
                  style={styles.infoBtnImage}
                  cachePolicy="memory"
                />
              </PressableScale>
            </View>

            <HeaderBlock watchlist={watchlist} />
          </View>
        )}
        renderItem={({ item }) => (
          <MovieCard movie={item} />
        )}
        ListEmptyComponent={
          <Text
            style={[
              textStyle.gray32,
              styles.emptyWatchlist
            ]}>
            Watchlist is empty
          </Text>
        }
        ListFooterComponent={<Spacer orientation="v" spacing={hp(9.5)} />}
      />
      <BottomBar />
    </ScreenBackground>
  );
};


const styles = StyleSheet.create({
  bgImage: {
    height: hp("45%"),
    width: "100%",
    marginBottom: hp("1%")
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    padding: hp(1),
    marginTop: "5%",
  },
  infoBtnView: {
    height: 26,
    width: 26
  },
  infoBtnImage: {
    height: "100%",
    width: "100%",
  },
  emptyWatchlist: {
    alignSelf: "center",
    opacity: 0.4,
    marginTop: hp("20%")
  },
});