import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { GetQueryResult } from "../services/queries";
import { getPopularMovies } from "@/api/tmdbApi";
import { getActiveCategory } from "./CategoriesBlock";
import ContentBlock from "./ContentBlock";
import ScreenBackground from "@/components/ui/screen-background";
import SearchInput from "./SearchInput";
import Spacer from "@/components/ui/spacer";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "@/app/bars/bottomBar";

type Search = {

}

type Data = {
  movies: any[];
  users: any[];
}

export default function SearchResultBlock({ route }: any) {
  const [_data, setData] = useState<any>();
  const [_value, setValue] = useState<string>("");

  const query = route?.params?.params;
  console.warn(`QUERY: ${query}`);

  async function load() {
    let data = {
      movies: [],
      users: [],
    }
    switch (query) {
      case "popular": {
        data.movies = await getPopularMovies();
        break;
      }
      case "now_playing": {
        data.movies = await getPopularMovies();
        break;
      }
      default: {
        data = await GetQueryResult(_value);
      }
    }
    if (data?.movies || data?.users) setData(data)
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <ScreenBackground>
      <Spacer orientation="v" spacing={heightPercentageToDP(5)} />
      <SearchInput placeholder="Enter query..." value={_value} setValue={setValue} onChangeText={load} />
      <ContentBlock query={_value} />
      <BottomBar/>
    </ScreenBackground>
  )
};