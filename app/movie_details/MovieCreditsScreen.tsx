import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { ImageBackground, SectionList, Text, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import CreditCard from "./components/CreditCard";
import { useNavigation } from "expo-router";
import { GetMovieCredits } from "./services/services";

type Credit = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  credit_id: string;
  known_for_department: string;
  character: string;
}

interface Credits {
  cast: Credit[];
  crew: Credit[];
}

export default function MovieCreditsScreen({ route }: any) {
  const [credits, setCredits] = useState<any>();
  const { movieID, poster_path } = route.params;
  const navigation = useNavigation();


  useEffect(() => {
    async function load() {
      const data = await GetMovieCredits(movieID);
      if (data) setCredits(data)
      console.warn(`Credits info: ${credits} \n Movie ID: ${movieID}`);
    };
    load();
  }, [movieID])

  const chunkBy3 = (array: any[]) => {
    const result = [];
    for (let i = 0; i < array?.length; i += 3) {
      result.push(array?.slice(i, i + 3));
    }
    return result;
  }

  const CreditsRow = (row: any) => {
    return (
      <View style={styles.rowView}>
        {
          row?.map((credit: any, index: number) => (
            <CreditCard key={index} credit={credit} />
          ))
        }
      </View>
    )
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
      source={{ uri: "https://image.tmdb.org/t/p/w500" + poster_path }}
      style={{ flex: 1 }}
    >
      <SectionList
        sections={SECTIONS}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.sectionList}

        ListHeaderComponent={() => (
          <LeafyReturnArrowButton
            style={{ marginTop: "5%", zIndex: 2 }}
            onPress={() => navigation.goBack()}
          />
        )}

        renderSectionHeader={({ section }) => (
          <>
            {section.title === "Crew" && (
              <View style={styles.line} />
            )}

            <Text style={styles.headerTitle}>
              {section.title}
            </Text>
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

const styles = {
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionList: {
    padding: "2%",
    paddingBottom: "20%",
    backgroundColor: "rgba(0,0,0,0.85)",
  },
  line: {
    backgroundColor: "white",
    height: 0.5,
    width: "80%",
    marginTop: "5%",
    marginBottom: "5%",
    alignSelf: "center",
  },
  headerTitle: [
    textStyle.yellow26,
    {
      marginBottom: "5%",
      alignSelf: "center",
    },
  ]
};