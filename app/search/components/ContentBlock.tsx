import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GetQueryResult } from "../services/queries";
import MovieCard from "./MovieCard";
import UserCard from "@/components/userCard";
import CategoriesBlock from "./CategoriesBlock";
import WatchlistCard from "./WatchlistCard";
import { heightPercentageToDP } from "react-native-responsive-screen";
import CreditCard from "./CreditCard";

interface Props {
  query: string;
  specification: string | undefined;
}

export default function ContentBlock({ query, specification = undefined }: Props) {
  const [category, setCategory] = useState<string>("All")
  const [_data, setData] = useState<any>();

  useEffect(() => {
    async function load() {
      const data = await GetQueryResult(query);
      if (data) setData(data);
    }
    if (!specification)
      load();
    if (query?.length < 2) setData([]);
  }, [query])

  return (
    <>
      <CategoriesBlock setCurrent={setCategory} />
      <View style={{ marginTop: heightPercentageToDP(1) }}></View>
      {
        (category === "All" || category === "Movies")
        && _data?.movies?.map((item: any, index: number) => <MovieCard movie={item} key={index} />)
      }
      {
        (category === "All" || category === "Users")
        && _data?.users?.map((item: any, index: number) => <UserCard user={item} key={index} />)
      }
      {
        (category === "All" || category === "Watchlists")
        && _data?.watchlists?.map((item: any, index: number) => <WatchlistCard watchlist={item} key={index} />)
      }
      {
        (category === "All" || category === "Credits")
        && _data?.credits?.map((item: any, index: number) => <CreditCard credit={item} key={index} />)
      }
      <View style={{ marginBottom: heightPercentageToDP(8) }}></View>
    </>
  )
}