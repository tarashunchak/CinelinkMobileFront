import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GetQueryResult } from "@/src/features/search/services/services";
import { getPopularMovies } from "@/api/tmdbApi";
import CategoriesBlock from "@/src/features/search/components/CategoriesBlock";
import ContentBlock from "@/src/features/search/components/ContentBlock";
import SearchInput from "@/src/features/search/components/SearchInput";
import HeaderContainer from "@/src/components/ui/header-container";

export default function SearchResultBlock() {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  return (
    <View style={styles.main}>
      <HeaderContainer style={styles.header}>
        <SearchInput placeholder="Enter query..." query={query} setQuery={setQuery} />
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