import React from "react";
import MovieCard from "./MovieCard";
import { View, StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import { FlatList } from "react-native-gesture-handler";

export default function MoviesList({ movies }: { movies: any[] }) {
  return (
    <FlatList
      data={movies}
      keyExtractor={(_, index) => String(index)}
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
      ListFooterComponent={
        <View style={styles.bottomSpacer}></View>
      }
    />
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