import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import React from "react";
import { FlatList, ImageBackground, ScrollView, SectionList, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "../bars/bottomBar";
import ActorCard from "./components/CreditsCard";

export default function MovieCreditsScreen({ route, navigation }: any) {
  const { credits, poster } = route.params;

  const chunkBy3 = (array: any) => {
    const result = [];
    for (let i = 0; i < array.length; i += 3) {
      result.push(array.slice(i, i + 3));
    }
    return result;
  }

  const CreditsRow = (row: any) => {
    return <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
      }}
    >
      {row?.map((actor: any, index) => (
        <View key={index}>
          <ActorCard cast={actor} />
        </View>
      ))
      }
    </View>
  }

  const SECTIONS = [
    {
      title: "Cast",
      data: chunkBy3(credits?.cast)
    },
    {
      title: "Crew",
      data: chunkBy3(credits?.crew)
    },
  ];

  return (
    <ImageBackground
      source={{ uri: "https://image.tmdb.org/t/p/w500" + poster }}
      style={{ flex: 1 }}
    >
      <SectionList
        sections={SECTIONS}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: "2%",
          paddingBottom: "20%",
          backgroundColor: "rgba(0,0,0,0.85)",
        }}

        ListHeaderComponent={() => (
          <LeafyReturnArrowButton
            style={{ marginTop: "5%", zIndex: 2 }}
            onPress={() => navigation.goBack()}
          />
        )}

        renderSectionHeader={({ section }) => (
          <>
            <Text
              style={[
                textStyle.yellow26,
                {
                  marginBottom: "5%",
                  alignSelf: "center",
                },
              ]}
            >
              {section.title}
            </Text>

            {section.title === "Crew" && (
              <View
                style={{
                  backgroundColor: "white",
                  height: 0.5,
                  width: "80%",
                  marginBottom: "5%",
                  alignSelf: "center",
                }}
              />
            )}
          </>
        )}

        renderItem={({ item }) => { return CreditsRow(item) }}

        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />

      <BottomBar />
    </ImageBackground>

  )
}