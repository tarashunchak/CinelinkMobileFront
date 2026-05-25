import { textStyle } from "@/styles/textStyles";
import { useRouter } from "expo-router";
import React, { useEffect, memo, useState, useMemo, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import HeaderContainer from "@/src/components/ui/header-container";
import { Canvas, LinearGradient, Rect, Mask, Image, vec, useImage, Blur, Skia } from "@shopify/react-native-skia";
import { GetMovieOfTheDayCache } from "../cache";

const SkiaBackdrop = memo(({ backdropPath }: { backdropPath: string }) => {
  const imageUri = useMemo(
    () => `https://image.tmdb.org/t/p/w500${backdropPath}`,
    [backdropPath]
  );
  const image = useImage(imageUri)

  if(!backdropPath) return;
  if (!image) return null;

  const maskElement = useMemo(() => (
    <Rect x={0} y={0} width={wp(100)} height={hp(45)}>
      <LinearGradient
        start={vec(0, 0)}
        end={vec(0, hp(45))}
        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.4)", "transparent"]}
        positions={[0.35, 0.65, 1]}
      />
    </Rect>
  ), []);

  const darkLayerMask = useMemo(()=>(
    <Rect x={0} y={0} width={wp(100)} height={hp(45)}>
      <LinearGradient
        start={vec(0, 0)}
        end={vec(0, hp(45))}
        colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.15)", "transparent"]}
        positions={[0.35, 0.65, 1]}
      />
    </Rect>
  ),[]);

  return (
    <Canvas style={styles.backdrop}>
      <Mask mode="alpha" mask={maskElement}>
        {image && (
          <Image
            image={image}
            x={0}
            y={0}
            width={wp(100)}
            height={hp(45)}
            fit="cover"
          >
            <Blur blur={1} />
          </Image>
        )}
        
      </Mask>
      <Mask mode="alpha" mask={darkLayerMask} >
        <Rect
          x={0}
          y={0}
          width={wp(100)}
          height={hp(45)}
          color={"rgba(0, 0, 0, 0.25"}
        />
      </Mask>
    </Canvas>
  )
},
  (prev, next) => prev.backdropPath === next.backdropPath
);

function MovieOfTheDay() {
  const router = useRouter();
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    async function loadMovie() {
      const data = await GetMovieOfTheDayCache();
      setMovie(prev => {
        if (prev?.movie_id === data?.movie_id)
          return prev;
        return data;
      });
    }

    loadMovie();
  }, []);

  const handlePress = useCallback(() => {
    router.navigate({
      pathname: "/(app)/movie_details",
      params: {
        movieID: movie?.movie_id,
        backdropPath: movie?.backdrop_path,
        posterPath: movie?.poster_path,
        title: movie?.title
      }
    });
  }, [movie]);

  return (
    <>
      <SkiaBackdrop backdropPath={movie?.backdrop_path} />
      <View style={[styles.background]} />
      <HeaderContainer>
        <AnimatedFastImage
          style={styles.logo}
          source={require("@/assets/images/logo.png")}
          cachePolicy="disk"
        />
        <Text
          style={
            [textStyle.white38,
            styles.text]
          }>
          {"Movie of the day"}
        </Text>
        <PressableScale onPress={handlePress}>
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
            cachePolicy="disk"
          />
        </PressableScale>
      </HeaderContainer>
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
    width: "104%",
    alignSelf: "center",
    position: "absolute",
    marginHorizontal: "-1%",
    top: 0,
    right: 0,
    left: 0,
  },
  background: {
    position: "absolute",
    alignSelf: "center",
    height: hp("45%"),
    width: "104%",
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
    height: 260,
    aspectRatio: 0.68,
    alignSelf: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    elevation: 100,
  },
});