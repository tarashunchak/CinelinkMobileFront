import { getMovieOfTheDay } from "@/api/tmdbApi";
import { textStyle } from "@/styles/textStyles";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { memo, useCallback, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurTargetView, BlurView } from "expo-blur";
import HeaderContainer from "@/components/ui/header-container";

function MovieOfTheDay() {
  const navigator = useNavigation();
  const [movie, setMovie] = useState();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      async function loadMovie() {
        const data = await getMovieOfTheDay();
        setMovie(data);
      }

      loadMovie();
    }, [])
  );

  const ref = useRef<View | null>(null);

  return (
    <>
      <AnimatedFastImage 
        sharedTransitionTag={`movie-${movie?.movie_id}-backdrop`}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path
            || movie?.poster_path}`
        }}
        style={styles.backdrop}
        cachePolicy="disk"
      />
      <View style={[styles.background]}>
        <Image
          style={styles.logo}
          source={require("@/app/home/assets/logo.png")}
          cachePolicy="disk"
        />
        <Text
          style={
            [textStyle.white38,
            styles.text]
          }>
          {"Movie of the day"}
        </Text>
        <PressableScale style={{}}
          onPress={() =>
            navigator?.navigate("MovieDetailScreen",
              { movieID: movie?.movie_id, backdropPath: movie?.backdrop_path, posterPath: movie?.poster_path, title: movie?.title }
            )
          }>
          <View style={styles.view}>
            <AnimatedFastText
              style={[
                textStyle.white24,
              ]}
              sharedTransitionTag={`movie-${movie?.movie_id}-title`}
              numberOfLines={1}
              ellipsizeMode="tail"
              >
                {movie?.title}
              </AnimatedFastText>
            <Text style={textStyle.white24}>
              {`(${movie?.release_date?.slice(0, 4)})`}
            </Text>
          </View>

          <AnimatedFastImage 
            sharedTransitionTag={`movie-${movie?.movie_id}-poster`}
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie?.poster_path}` }}
            style={styles.poster}
            cachePolicy="memory-disk"
          />
        </PressableScale>
      </View>
    </>
  )
};

export default memo(MovieOfTheDay);

const styles = StyleSheet.create({
  logo: {
    height: 40,
    aspectRatio: 2,
  },
  backdrop: {
    height: hp("45%"),
    width:"104%",
    alignSelf:"center",
    position: "absolute",
    top: 0,
  },
  background: {
    alignSelf: "center",
    height: hp("45%"),
    width: "104%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: "2%",
  },
  view: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 5,
    maxWidth: wp(76),
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    maxWidth: wp("80%")
  },
  poster: {
    marginTop: "2%",
    height: "80%",
    width: "45%",
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5
  },
});