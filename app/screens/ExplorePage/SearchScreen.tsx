import { inputStyle } from "@/styles/inputStyle";
import React from "react";
import { ImageBackground, Text, ScrollView, TextInput, View } from "react-native";
import { searchScreen } from "./styles";
import SearchInput from "./components/input";
import BottomBar from "../bars/bottomBar";
import { textStyle } from "@/styles/textStyles";
import MovieCard from "./components/movieCard";
import { addToHistory, getHistory } from "@/local_storage/local_storage";

export default function SearchScreen({ navigation }: any) {
  const localHistory = getHistory();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1, padding: "2%", paddingTop: "10%" }}>
        <SearchInput />
        <Text style={textStyle.white22}>Recents</Text>
        {

        }
        <MovieCard />
      </ImageBackground>
      <BottomBar />
    </View >
  )
}