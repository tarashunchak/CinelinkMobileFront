import React, { useEffect, useState } from "react";
import { Image, View, Text, TouchableOpacity, ImageBackground, TextInput, ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import SearchInput from "./input";
import { GetQueryResult } from "../services/queries";
import { textStyle } from "@/styles/textStyles";
import MovieCard from "./movieCard";
import UserCard from "@/components/userCard";

type Search = {

}

export default function SearchResultBlock({ route }: any) {
  const navigator = useNavigation();
  const [_data, setData] = useState<any[]>([]);
  const [_value, setValue] = useState<string>("");

  const query: string = route?.params?.query;

  async function load() {
    const data = await GetQueryResult(_value);
    if (data) setData(data)
  }

  useEffect(() => {
    load();
  }, [])

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1, padding: "1%", paddingTop: "10%", paddingBottom: "10%" }}>
        <View style={styles.input.view}>
          <Image style={styles.input.icon}
            source={require("@/app/search/assets/search.png")}
          />
          <TextInput
            style={[textStyle.white20, { marginLeft: 5, height: "100%", width: "80%" }]}
            value={_value}
            onChangeText={text => {
              setValue(text);
              load();
            }}
          />
        </View>
        {
          _data?.map((item: any, index: number) => {

            return (
              item?.type == "movie" && <MovieCard movie={item} key={index} />,
              item?.type == "user" && <UserCard user={item} key={index} />
            )
          }
          ) || null
        }
      </ScrollView>
    </ImageBackground>
  )
}

const styles = {
  input: {
    view: {
      height: 54,
      width: "96%",
      margin: "2%",
      marginTop: "1%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 8,
      flexDirection: "row",
    },
    icon: {
      backgroundColor: "transparent",
      height: 34,
      width: 34,
      alignSelf: "center",
      marginLeft: 10
    },
  }
};