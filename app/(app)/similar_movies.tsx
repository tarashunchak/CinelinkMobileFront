import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Text, FlatList, View, StyleSheet } from "react-native";
import CreditCard from "@/src/features/movie_details/components/CreditCard";
import { GetMovieCredits } from "@/src/features/movie_details/services/services";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { BlurTargetView, BlurView } from "expo-blur";
import { textStyle } from "@/styles/textStyles";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import { getSimilarMovies } from "@/api/tmdbApi";
import { useMovieStore } from "@/src/rt_client/managers/movies_manager";
import Header from "@/src/features/movie_details/components/Header";
import MovieCard from "@/src/features/movie_details/components/MovieCard";


type Movie = {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  Movie_id: string;
  known_for_department: string;
  character: string;
}

interface Movies {
  cast: Movie[];
  crew: Movie[];
}

export default function SimilarMoviesScreen() {
  const router = useRouter();
  const [movies, setMovies] = useState<any>();
  const { movieID, posterPath } = useLocalSearchParams();
  const movie = useMovieStore(s => s.movies[movieID]);

  const setBottomBarVisible = useBlurStore(s => s.setBottomBarVisible);

  useEffect(() => {
    setBottomBarVisible(false);
    async function load() {
      const data = await getSimilarMovies(movieID);
      if (data && data.length !== 0) setMovies(data)
        console.warn("SIMILAR MOVIES: ", data),
      console.warn("POSTER PATH: ", posterPath);
    };
    load();
    return () => {
      setBottomBarVisible(true);
    }
  }, [movieID])

  const renderItem = useCallback(({ item }: any) =>
    <MovieCard movie={item}
      onPress={() => router.navigate({
        pathname: "/movie_details",
        params: {
          movieID: item.id,
          title: item.name,
          posterPath: item.profile_path
        }
      })}
    />
    , [movieID]);
  const ref = useRef<View | null>(null);

  return (
    <View style={{ flex: 1 }}>
      <BlurTargetView ref={ref} style={{ flex: 1 }}>
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
          data={movies}
          numColumns={3}
          maximumZoomScale={2}
          initialNumToRender={12}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item: any, index: number) => String(item?.id ?? index)}
          renderItem={renderItem}
        />
      </BlurTargetView>
      <Header title={movie?.title} ref={ref} movieID={movieID} />
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