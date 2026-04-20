import { inputStyle } from "@/styles/inputStyle";
import React from "react";
import { ImageBackground, Text, ScrollView, TextInput, View } from "react-native";
import { searchScreen } from "./styles";
import SearchInput from "./components/Input";
import BottomBar from "../bars/bottomBar";
import { textStyle } from "@/styles/textStyles";
import MovieCard from "./components/MovieCard";
import ScreenBackground from "@/components/ui/screen-background";
//import { addToHistory, getHistory } from "@/local_storage/local_storage";

export default function SearchScreen({ navigation }: any) {
  //const localHistory = getHistory();
  return (
    <ScreenBackground>
      <SearchInput placeholder="" value="" />
      <Text style={textStyle.white22}>Recents</Text>
      {

      }
      <MovieCard />

      <BottomBar />
    </ScreenBackground>
  )
}