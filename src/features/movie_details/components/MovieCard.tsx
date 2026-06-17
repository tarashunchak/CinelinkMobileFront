import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import { useRouter } from "expo-router";

export default function MovieCard({movie}: any){
  const router = useRouter();

  const handlePress = useCallback(()=>{
    router.push({
        pathname: "/movie_details",
        params: {
          movieID: movie.id,
          movieName: movie.name,
          profilePath: movie.profile_path
        }
    })
  }, [movie?.id]);

  return (
    <PressableScale
      style={styles.view}
      onPress={handlePress}>
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie.id}-profile`}
        source={movie.poster_path}
        style={styles.img}
        cachePolicy="disk"
      />
    </PressableScale>    
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "column",
    height: 175,
    width: 110,
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
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
});