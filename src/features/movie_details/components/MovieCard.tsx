import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import { useRouter } from "expo-router";

export default function MovieCard({movie, onPress }: any){
  //const router = useRouter();

  /*const handlePress = useCallback(()=>{
    router.push({
        pathname: "/movie_details",
        params: {
          movieID: movie.id,
          movieName: movie.title,
          profilePath: movie.profile_path
        }
    })
  }, [movie?.id]);*/

  return (
    <PressableScale
      style={styles.view}
      onPress={() => onPress(movie)}>
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie.id}-profile`}
        source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}}
        style={styles.img}
        cachePolicy="memory-disk"
      />
    </PressableScale>    
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "column",
    height: 175,
    aspectRatio: 0.67,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    margin: 1.5,
    marginRight: 5,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0.5,
  },
  img: {
    height: "100%",
    width: "100%",
    borderRadius: 6,
    //borderTopRightRadius: 6
  },
});