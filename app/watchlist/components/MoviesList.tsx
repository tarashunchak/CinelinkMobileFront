import React from "react";
import MovieCard from "./MovieCard";
import { View, StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";

export default function MoviesList({ movies }: { movies: any[] }) {
  return (
    <>
      {
        movies?.map((item: any, index: number) =>
          <MovieCard key={index} movie={item} />)
        ??
        <Text
          style={[
            textStyle.gray32,
            styles.emptyWatchlist
          ]}>
          Watchlist is empty
        </Text>
      }
      <View style={styles.bottomSpacer}></View>
    </>
  )
}

const styles = StyleSheet.create({
  emptyWatchlist: {
    alignSelf: "center",
    opacity: 0.4,
    marginTop: hp("20%")
  },
  bottomSpacer: {
    height: hp(8),
  }
});