import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useMemo, useState } from "react";
import { ImageBackground, SectionList, StyleSheet, Text, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import CreditCard from "./components/CreditCard";
import { useNavigation } from "expo-router";
import { GetMovieCredits } from "./services/services";
import { FlatList } from "react-native-gesture-handler";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { FlashList } from "@shopify/flash-list";

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


  useEffect(() => {
    async function load() {
      const data = await GetMovieCredits(movieID);
      if (data) setCredits(data)
    };
    load();
  }, [movieID])

  return (
    <ImageBackground
      source={{ uri: "https://image.tmdb.org/t/p/w500" + poster_path }}
      style={styles.view}
    >
      <FlatList
        style={styles.listView}
        ListHeaderComponent={ReturnArrowButton}
        ListHeaderComponentStyle={styles.listHeader}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={[
          ...(credits?.cast || []),
          ...(credits?.crew || [])
        ]}
        numColumns={3}
        maximumZoomScale={2}
        keyExtractor={(item: any, index: any) => String(item.id)}
        renderItem={({ item }: any) => (<CreditCard credit={item} />)}
      />

      <BottomBar />
    </ImageBackground>

  )
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  listView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  listHeader: {
    marginBottom: "5%"
  },
  contentContainer: {
    padding: "5%",
    paddingHorizontal: "2%",
    paddingBottom: "10%"
  },
});