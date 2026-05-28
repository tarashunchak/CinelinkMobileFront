import { textStyle } from "@/styles/textStyles";
import React, { memo, useCallback, useMemo } from "react";
import { Linking, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Movie } from "../../movie_details/types";
import { useNavigation, useRouter } from "expo-router";
import GenresLayout from "./GenresLayout";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";

function MovieCard({ movie }: { movie: Movie | null }) {
  const router = useRouter();
  if (!movie) return <Skeleton height={118} width={"100%"} style={styles.mainView} />

  const handlerPress = useCallback(()=>{
    if(!movie) return;
    router?.push({
      pathname: "/movie_details", 
      params: { 
      movieID: movie?.movie_id, 
      posterPath: movie?.poster_path,
      title: movie?.title,
      }
    });
  }, [movie?.movie_id, movie?.poster_path]);

  const openIMDb = useCallback(async () => {
    if(!movie?.imdb_id) return;
    const url = `https://www.imdb.com/titleText/${movie?.imdb_id}`;
    const sup = await Linking.canOpenURL(url);
    if (sup) Linking.openURL(url);
  }, [movie?.imdb_id]);

  const releaseYear = useMemo(()=> 
    movie?.release_date ? ` (${movie?.release_date?.slice(0, 4)})` : "0.0",
  [movie?.release_date]);

  return (
    <PressableScale
      activeScale={0.98}
      style={styles?.mainView}
      onPress={handlerPress}
    >
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie?.movie_id}-poster`}
        source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
        style={styles.poster}
        pointerEvents="none"
        cachePolicy="memory"
      />
      <View style={{ flexDirection: "column", height: "100%", marginLeft: "4%", justifyContent: "space-evenly" }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <AnimatedFastText 
            sharedTransitionTag={`movie-${movie?.movie_id}-title`}
            style={[textStyle.white16, styles.titleText]}
            pointerEvents="none"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {movie?.title}
          </AnimatedFastText>
          <Text
            style={[
              styles.yearText,
              textStyle.gray16
            ]}
            pointerEvents="none">
            {releaseYear}
          </Text>
        </View>

        <TouchableOpacity style={styles.imdbView}
          onPress={openIMDb}
        >
          <Text style={styles.imdbText}>
            {`IMDb: ${movie?.imdb_rating?.toFixed(1)}`}
          </Text>
        </TouchableOpacity>

        <GenresLayout genres={movie?.genres} />
      </View>
    </PressableScale>
  );
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    height: 118,
    width: "100%",
    marginTop: "1.5%",
    borderRadius: 15,
    padding: "1%",
    paddingRight: "5%",
    paddingLeft: "5%",
    flexDirection: "row",
  },
  titleText: {
    marginTop: "-1%",
    minWidth: "1%",
    maxWidth: "75%",
  },
  yearText: {
    fontSize: 16,
    marginTop: "-1%",
    color: "white",
    fontFamily: "sans-serif-condensed",
    textAlign: "left",
  },
  directorText: {
    fontSize: 12,
    color: "#ACACAC",
    fontFamily: "sans-serif-condensed",
    marginTop: 2,
  },
  imdbView: {
    backgroundColor: "#deb522",
    height: 20,
    borderRadius: 4,
    width: 64,
    flexDirection: "column",
    justifyContent: "center"
  },
  imdbText: {
    textAlign: "center",
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
  },
  poster: {
    width: 73,
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
});