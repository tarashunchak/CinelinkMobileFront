import React from "react";
import MovieCard from "./MovieCard";
import { View, StyleSheet, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import { FlatList } from "react-native-gesture-handler";

export default function MoviesList({ movies }: { movies: any[] }) {
  return (
    null
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