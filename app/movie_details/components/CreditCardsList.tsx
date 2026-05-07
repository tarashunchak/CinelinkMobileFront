import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CreditCard from "./CreditCard";
import EmptyCreditCard from "./EmptyCreditCard";

export default function CreditCardsList(
  { movieID, credits, poster_path }:
    {
      movieID: number,
      credits?: any[],
      poster_path: string
    }
) {
  if (!credits) credits = Array.from({ length: 10 })
  return (
    <FlatList
      horizontal
      style={styles.view}
      data={credits}
      keyExtractor={(item: any, index: number) => String(index)}
      renderItem={({ item }) => <CreditCard credit={item} />}
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