import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import BottomBar from "@/app/(app)/bars/bottomBar";
import CreditCard from "./components/CreditCard";
import { GetMovieCredits } from "./services/services";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import HeaderContainer from "@/src/components/ui/header-container";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const insets = useSafeAreaInsets();

  const renderItem = useCallback(({ item }: any) => 
    <CreditCard credit={item} />
  , [movieID])

  return (
    <GestureHandlerRootView>
    <ImageBackground
      source={{ uri: "https://image.tmdb.org/t/p/w500" + poster_path }}
      style={styles.view}
    >
      <FlatList
        style={styles.listView}
        ListHeaderComponent={ReturnArrowButton}
        ListHeaderComponentStyle={styles.listHeader}
        contentContainerStyle={[styles.contentContainer, {paddingTop: insets.top}]}
        showsVerticalScrollIndicator={false}
        data={[
          ...(credits?.cast || []),
          ...(credits?.crew || [])
        ]}
        numColumns={3}
        maximumZoomScale={2}
        keyExtractor={(item: any, index: any) => String(item.id)}
        renderItem={renderItem}
      />
      <BottomBar />
    </ImageBackground>
</GestureHandlerRootView>
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
    paddingHorizontal: "2%",
    paddingBottom: hp("10%"),
  },
});