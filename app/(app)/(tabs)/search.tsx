import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GetQueryResult } from "@/src/features/search/services/services";
import { getPopularMovies } from "@/api/tmdbApi";
import CategoriesBlock from "@/src/features/search/components/CategoriesBlock";
import ContentBlock from "@/src/features/search/components/ContentBlock";
import SearchInput from "@/src/features/search/components/SearchInput";
import HeaderContainer from "@/src/components/ui/header-container";

export default function SearchResultBlock() {
  const [data, setData] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  /*const query = route?.params?.params;
  console.warn(`QUERY: ${query}`);*/

  async function load() {
    
    /*switch (query) {
      case "popular": {
        resp.movies = await getPopularMovies();
        break;
      }
      case "now_playing": {
        resp.movies = await getPopularMovies();
        break;
      }
      default: {
        resp = await GetQueryResult(query);
      }
    }*/
    /*if(query.length === 0) {
      setData([]);
      return;
    };
    const resp = await GetQueryResult(query);
    setData(resp);*/
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <View style={styles.main}>
      <HeaderContainer style={styles.header}>
        <SearchInput placeholder="Enter query..." query={query} setQuery={setQuery} onChangeText={load} />
        <CategoriesBlock category={category} setCategory={setCategory} />
      </HeaderContainer>
      <ContentBlock query={query} category={category} />
    </View>
  )
};

const styles = StyleSheet.create({
  main: { flex: 1 },
  header: {
    backgroundColor: "#222831",
    justifyContent: "space-evenly",
    gap: "1%",
    elevation: 5,
  },
});