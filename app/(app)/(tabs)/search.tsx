import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { GetQueryResult } from "@/src/features/search/services/services";
import { getPopularMovies } from "@/api/tmdbApi";
import { getActiveCategory } from "@/src/features/search/components/CategoriesBlock";
import ContentBlock from "@/src/features/search/components/ContentBlock";
import ScreenBackground from "@/src/components/ui/screen-background";
import SearchInput from "@/src/features/search/components/SearchInput";
import Spacer from "@/src/components/ui/spacer";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "@/app/(app)/bars/bottomBar";
import HeaderContainer from "@/src/components/ui/header-container";

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
    <HeaderContainer>
      <SearchInput placeholder="Enter query..." value={_value} setValue={setValue} onChangeText={load} />
      <ContentBlock query={_value} />
    </HeaderContainer>
  )
};