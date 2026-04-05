import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CreditCard from "./CreditCard";
import EmptyCreditCard from "./EmptyCreditCard";

export default function CreditCardsList(
  { movieID, credits, poster_path }:
    {
      movieID: number,
      credits: any[],
      poster_path: string
    }
) {
  return (
    <FlatList
      horizontal
      style={styles.view}
      data={credits}
      keyExtractor={(item: any, _: number) => String(item?.imdb_id)}
      renderItem={({ item }) => (<CreditCard credit={item} />)}
      ListFooterComponent={<EmptyCreditCard
        key={credits?.length + 1}
        movieID={movieID}
        poster_path={poster_path}
      />}
    />
  )
}

const styles = StyleSheet.create({
  view: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
  },
});