import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import CreditCard from "./CreditCard";
import EmptyCreditCard from "./EmptyCreditCard";
import { useRouter } from "expo-router";

interface Props {
  movieID: number;
  credits: any[];
  posterPath: string;
  title: string;
}

export default function CreditCardsList(
  { movieID, credits, posterPath, title }: Props
) {

  const router = useRouter();
  const isLoading = !credits || credits.length === 0;
  const data = isLoading ? Array.from({ length: 10 }) : credits;

  const renderItem = useCallback(({ item }: any) =>
    <CreditCard credit={item}/>
    , [movieID])

  return (
    <FlatList
      horizontal
      style={styles.view}
      data={data}
      keyExtractor={(item: any, index: number) => String(item?.credit_id ?? index)}
      renderItem={renderItem}
      ListFooterComponent={
        credits?.[0] ? <EmptyCreditCard
          movieID={movieID}
          posterPath={posterPath}
          title={title}
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