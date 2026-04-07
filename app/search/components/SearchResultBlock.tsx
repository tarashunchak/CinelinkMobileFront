import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, ImageBackground, TextInput, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import SearchInput from "./input";
import { GetQueryResult } from "../services/queries";
import { textStyle } from "@/styles/textStyles";
import MovieCard from "./MovieCard";
import UserCard from "@/components/userCard";
import { getNowPlayingMovies, getPopularMovies } from "@/api/tmdbApi";
import CategoriesBlock, { getActiveCategory } from "./CategoriesBlock";
import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import ContentBlock from "./ContentBlock";

type Search = {

}

type Data = {
  movies: any[];
  users: any[];
}

export default function SearchResultBlock({ route }: any) {
  const navigator = useNavigation();
  const [_data, setData] = useState<any>();
  const [_value, setValue] = useState<string>("");

  const activeCategory: string = getActiveCategory();
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
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={{
        flex: 1,
        padding: "1%",
        paddingTop: "10%",
        paddingBottom: "10%"
      }}
    >
      <View style={styles.inputView}>
        <LeafyReturnArrowButton onPress={navigator.goBack} />
        <TextInput
          style={[textStyle.white20,
          {
            marginLeft: 5,
            height: "100%",
            width: "73%"
          }
          ]}
          value={_value}
          onChangeText={text => {
            setValue(text);
            load();
          }}
        />
        <TouchableOpacity style={{ height: "90%", width: "90%", justifyContent: "center" }}>
          <Image
            source={require("@/app/search/assets/filter.png")}
            style={{ height: 34, width: 34 }}
          />
        </TouchableOpacity>
      </View>
      <ContentBlock query={_value} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inputView: {
    height: 50,
    width: "96%",
    margin: "2%",
    marginTop: "1%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    backgroundColor: "transparent",
    height: 34,
    width: 34,
    alignSelf: "center",
    marginLeft: 10
  },
});