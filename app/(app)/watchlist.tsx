import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { GetWatchlistMovies } from "@/api/watchlist/watchlist";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import ScreenBackground from "@/src/components/ui/screen-background";
import MovieCard from "@/src/features/watchlist/components/MovieCard";
import { textStyle } from "@/styles/textStyles";
import Spacer from "@/src/components/ui/spacer";
import { FlatList } from "react-native-gesture-handler";
import Header from "@/src/features/watchlist/components/Header";
import { useLocalSearchParams } from "expo-router";

export default function WatchlistScreen() {
  const { watchlist } = useLocalSearchParams();
  const [movies, setMovies] = useState<any[]>(Array.from({ length: watchlist.movies_quantity }));

  useEffect(() => {
    async function loadWatchlistMovies() {
      if(!watchlist.id) return;
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
        ListHeaderComponent={<Header watchlist={watchlist}/>}
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
        ListFooterComponent={<Spacer orientation="v" spacing={hp(9)} />}
      />
    </ScreenBackground>
  );
};


const styles = StyleSheet.create({
  bgImage: {
    height: hp("45%"),
    width: "100%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: hp(1),
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