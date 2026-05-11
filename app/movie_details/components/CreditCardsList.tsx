import React, { useMemo } from "react";
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

  const isLoading = !credits || credits.length === 0;

  const posterPath = useMemo(()=> poster_path, [movieID]);

  const data = isLoading ? Array.from({ length: 10 }) : credits;

  return (
    <FlatList
      horizontal
      style={styles.view}
      data={data}
      keyExtractor={(item: any, index: number) => String(item?.credit_id ?? `skeleton${index}`)}
      renderItem={({ item }) => <CreditCard credit={item} />}
      ListFooterComponent={
        credits?.[0] ? <EmptyCreditCard
          movieID={movieID}
          poster_path={posterPath}
        />
        : null
      }
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