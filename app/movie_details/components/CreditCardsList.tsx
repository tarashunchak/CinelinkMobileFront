import React from "react";
import { ScrollView, StyleSheet } from "react-native";
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
    <ScrollView
      horizontal
      style={styles.view}
    >
      {[
        credits?.map((person, index) =>
          <CreditCard key={index} credit={person} />
        ),
        <EmptyCreditCard
          key={credits?.length + 1}
          movieID={movieID}
          poster_path={poster_path}
        />
      ]}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  view: {
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    borderWidth: 1,
  },
});