import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { GetQueryResult, SearchMovie, SearchPerson, SearchUser, SearchWatchlist } from "../services/queries";
import MovieCard from "./MovieCard";
import UserCard from "@/components/userCard";
import CategoriesBlock from "./CategoriesBlock";
import WatchlistCard from "./WatchlistCard";
import { heightPercentageToDP } from "react-native-responsive-screen";
import CreditCard from "./CreditCard";
import { textStyle } from "@/styles/textStyles";

interface Props {
  query: string;
  specification: string | undefined;
}

export default function ContentBlock({ query, specification = undefined }: Props) {
  const [category, setCategory] = useState<string>("All")
  const [_data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const data = await GetQueryResult(query);
      if (!data) return;

      setData(data?.results);
    } catch (exception: any) {
    }
  }, [query])

  useEffect(() => {
    async function load() {
      await fetchData()
    }
    if (!specification)
      load();
    if (query?.length < 2) setData([]);
  }, [query, category])


  const filteredData = useCallback(() => {
    if (!Array.isArray(_data)) return [];
    if (category === "All") return _data;
    return _data?.filter((item: any) => item?.type === category.toLowerCase()) ?? [];
  }, [category, _data])

  return (
    <>
      <CategoriesBlock setCurrent={setCategory} />
      <View style={styles.topSpacer}></View>
      <FlatList
        style={{ flex: 1 }}
        data={filteredData()}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item }) => {
          console.warn("Item: ", item)

          switch (item?.type) {
            case "movies":
              return <MovieCard movie={item} />;
            case "credits":
              return <CreditCard credit={item} />;
            case "users":
              return <UserCard user={item} />;
            case "watchlists":
              return <WatchlistCard watchlist={item} />;
            default:
              return null
          }
        }}
        ListEmptyComponent={
          (<Text style={[textStyle?.gray40,
          {
            alignSelf: "center",
            marginTop: "50%"
          }
          ]}>No Results</Text>
          )
        }
      />
      < View style={styles.bottomSpacer}></View >
    </>
  )
}

const styles = StyleSheet.create({
  topSpacer: { marginTop: heightPercentageToDP(1) },
  bottomSpacer: { marginBottom: heightPercentageToDP(8) }
});