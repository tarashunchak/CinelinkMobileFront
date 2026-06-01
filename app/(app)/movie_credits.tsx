import React, { useCallback, useEffect, useState } from "react";
import { useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";
import { ImageBackground, StyleSheet } from "react-native";
import BottomBar from "@/app/(app)/bars/bottomBar";
import CreditCard from "@/src/features/movie_details/components/CreditCard";
import { GetMovieCredits } from "@/src/features/movie_details/services/services";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { BlurView } from "expo-blur";

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

export default function MovieCreditsScreen() {
  const router = useRouter();
  const [credits, setCredits] = useState<any>();
  const { movieID, poster_path } = useLocalSearchParams();

  useEffect(() => {
    async function load() {
      const data = await GetMovieCredits(movieID);
      if (data) setCredits(data)
    };
    load();
  }, [movieID])

  const insets = useSafeAreaInsets();

  const renderItem = useCallback(({ item }: any) =>
    <CreditCard credit={item}
      onPress={() => router.navigate({
        pathname: "/credit_details",
        params: {
          creditID: item.id,
          creditName: item.name,
          profilePath: item.profile_path
        }
      })}
    />
    , [movieID])

  return (
    <GestureHandlerRootView>
      <AnimatedFastImage
        source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
        style={styles.view}
        sharedTransitionTag={`movie-${movieID}-poster`}
      />
      <FlatList
        style={styles.listView}
        ListHeaderComponent={ReturnArrowButton}
        ListHeaderComponentStyle={styles.listHeader}
        contentContainerStyle={[styles.contentContainer, { paddingTop: insets.top }]}
        showsVerticalScrollIndicator={false}
        data={[
          ...credits?.cast ?? [],
          ...credits?.crew ?? [],
        ]}
        numColumns={3}
        maximumZoomScale={2}
        columnWrapperStyle={{justifyContent: "space-between"}}
        keyExtractor={(item: any, index: number) => String(item?.id ?? index)}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  )
};

const styles = StyleSheet.create({
  view: {
    height: hp(100),
    width: wp(100),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  listView: {
    height: hp(100),
    width: wp(100),
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  listHeader: {
    marginBottom: "5%"
  },
  contentContainer: {
    paddingHorizontal: "2%",
    paddingBottom: hp("10%"),
  },
});