import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CreditCard from "@/src/features/movie_details/components/CreditCard";
import { GetMovieCredits } from "@/src/features/movie_details/services/services";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useLocalSearchParams } from "expo-router";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { BlurTargetView } from "expo-blur";
import Header from "@/src/features/movie_details/components/Header";

type Credit = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  credit_id: string;
  known_for_department: string;
  character: string;
}

export default function MovieCreditsScreen() {
  //const router = useRouter();
  const [credits, setCredits] = useState<any>();
  const { movieID, posterPath, title } = useLocalSearchParams();

  const setBottomBarVisible = useBlurStore(s => s.setBottomBarVisible);

  useEffect(() => {
    setBottomBarVisible(false);
    async function load() {
      const data = await GetMovieCredits(movieID);
      if (data) setCredits(data)
      console.warn("POSTER PATH: ", posterPath);
    };
    load();
    return () => {
      setBottomBarVisible(true);
    }
  }, [movieID])

  const renderItem = useCallback(({ item }: any) =>
    <CreditCard credit={item} />
    , [movieID])

  const ref = useRef<View | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <BlurTargetView ref={ref} style={StyleSheet.absoluteFill}>
        <AnimatedFastImage
          source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}` }}
          style={styles.view}
          sharedTransitionTag={`movie-${movieID}-poster`}
          cachePolicy="disk"
        />
        <FlatList
          style={styles.listView}
          contentContainerStyle={[styles.contentContainer]}
          showsVerticalScrollIndicator={false}
          data={[
            ...credits?.cast ?? [],
            ...credits?.crew ?? [],
          ]}
          numColumns={3}
          maximumZoomScale={2}
          initialNumToRender={12}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item: any, index: number) => String(item?.id ?? index)}
          renderItem={renderItem}
        />
      </BlurTargetView>
      <Header title={title} ref={ref} movieID={movieID} />
    </View>
  )
};

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  listView: {
    flex: 1,
    backgroundColor: "rgba(2, 1, 1, 0.8)"
  },
  headerView: {

  },
  listHeader: {
    //backgroundColor: "black",
    paddingHorizontal: "1%",
    paddingVertical: "3%",
    width: wp(100),
    elevation: 5,
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
  contentContainer: {
    paddingHorizontal: "2%",
    paddingBottom: hp("5%"),
    paddingTop: hp("14%"),
  },
  titleStyle: {
    width: wp(70),
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    fontWeight: "bold",
  },
});