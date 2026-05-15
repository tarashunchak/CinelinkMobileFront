import { getMovieOfTheDay } from "@/api/tmdbApi";
import { textStyle } from "@/styles/textStyles";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { memo, useCallback, useRef, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import Animated, { createAnimatedComponent } from "react-native-reanimated";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurTargetView, BlurView } from "expo-blur";

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

  const AnimatedFastImage = createAnimatedComponent(Image);

  const ref = useRef<View | null>(null);

  return (
    <>
    <BlurTargetView ref={ref}>
      <AnimatedFastImage 
        sharedTransitionTag={`movie-${movie?.movie_id}-backdrop`}
        source={{
          uri: `https://image.tmdb.org/t/p/w300${movie?.backdrop_path
            || movie?.poster_path}`
        }}
        style={styles.backdrop}
        cachePolicy="memory-disk"
      />
    </BlurTargetView>
    <BlurView style={[styles.backdrop, {position: "absolute", top:0,left:0, right:0}]}
      blurTarget={ref}
      tint="dark"
      intensity={20}
      blurReductionFactor={60}
      blurMethod="dimezisBlurView"
    />
      <View style={[styles.background, {paddingTop: insets.top }]}>
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
    height: "10%",
    width: "20%",
    marginLeft: "3%",
    marginTop: "3%"
  },
  backdrop: {
    height: hp("45%"),
    margin: "-2%",
    marginBottom: hp(5)
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: hp("47%"),
    width: "104%",
    margin: "-2%",
    paddingTop: "5%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  view: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 5,
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