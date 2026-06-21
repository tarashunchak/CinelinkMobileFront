import React, { useCallback, useEffect, useState } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { GetQueryResult } from "../services/services";
import MovieCard from "./MovieCard";
import UserCard from "@/src/components/user-card";
import WatchlistCard from "./WatchlistCard";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CreditCard from "./CreditCard";
import { textStyle } from "@/styles/textStyles";
import Spacer from "@/src/components/ui/spacer";
import { UserID } from "@/src/rt_client/models/models";
import { useRouter } from "expo-router";

interface Props {
  query: string;
  specification: string | undefined;
  category: string;
};

export default function ContentBlock({ query, category }: Props) {
  const specification = false;
  const [_data, setData] = useState([]);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const data = await GetQueryResult(query);
      if (!data) return;
      setData(data?.results);
    } catch (exception: any) {
    }  
  }, []);

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
  }, [category, _data]);

  const renderItem = useCallback(({ item }: any) => {
    console.warn("Item: ", item)

  const onUserPress = (userID: UserID)=>{
    router.push({
      pathname: "profile",
      params: {userID}
    })
  };

  const onMoviePress = useCallback((movieID: number)=>{
    router.push({
      pathname: "movie",
      params: {movieID}
    })
  }, []);

    switch (item?.type) {
      case "movies":
        return <MovieCard movie={item} />;
      case "credits":
        return <CreditCard credit={item} />;
      case "users":
        return <UserCard user={item} onPress={onUserPress}/>;
      case "watchlists":
        return <WatchlistCard watchlist={item} />;
      default:
        return null
    }
  }, []);

return (
  <FlatList
    data={filteredData()}
    keyExtractor={(_, index) => String(index)}
    renderItem={renderItem}
    ListEmptyComponent={
      (<Text style={[textStyle?.gray40,
      {
        alignSelf: "center",
        marginTop: "50%"
      }
      ]}>No Results</Text>
      )
    }
    ListFooterComponent={
      <Spacer orientation="v" spacing={hp(9)} />
    }
  />
)
}

const styles = StyleSheet.create({
  topSpacer: { marginTop: hp(1) },
  bottomSpacer: { marginBottom: hp(8) }
});