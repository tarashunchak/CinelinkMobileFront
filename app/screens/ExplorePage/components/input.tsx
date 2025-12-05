import React from "react";
import { View, TextInput, Image } from "react-native";
import { searchScreen } from "../styles";

export default function SearchInput() {
  return (
    <View style={searchScreen.input.view}>
      <Image style={searchScreen.input.icon} source={require("@/app/screens/ExplorePage/assets/search.png")} />
      <TextInput style={searchScreen.input.textInput} placeholderTextColor={"rgba(255, 255, 255, 0.6)"} placeholder="Search movies, people, genders..." />
    </View >
  );
};