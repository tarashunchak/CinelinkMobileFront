import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import CreditCard from "./CreditCard";
import EmptyCreditCard from "./EmptyCreditCard";
import { useRouter } from "expo-router";

export default function CreditCardsList(
  { movieID, credits, poster_path }:
    {
      movieID: number,
      credits: any[],
      poster_path: string
    }
) {

  const router = useRouter();

  const isLoading = !credits || credits.length === 0;

  const posterPath = useMemo(()=> poster_path, [movieID]);

  const data = isLoading ? Array.from({ length: 10 }) : credits;

  const renderItem = useCallback(({ item }: any) =>
    <CreditCard credit={item}
      onPress={() => router.navigate({
        pathname: "/credit_details",
        params: {
          creditID: item.id,
          creditName: item.name,
          profilePath: item.profile_path
        }
      })}
    />
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