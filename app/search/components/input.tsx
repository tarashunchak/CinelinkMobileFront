import React from "react";
import { View, TextInput, Image } from "react-native";
import { searchScreen } from "../styles";

interface Props {
  placeholder: string | undefined;
  value: string | undefined;
}

export default function SearchInput({ props }: { props: Props }) {
  return (
    <View style={searchScreen.input.view}>
      <Image style={searchScreen.input.icon} source={require("@/app/search/assets/search.png")} />
      <TextInput style={searchScreen.input.textInput}
        placeholderTextColor={"rgba(255, 255, 255, 0.6)"}
        placeholder={props?.placeholder}
        value={props?.value}
      />
    </View >
  );
};