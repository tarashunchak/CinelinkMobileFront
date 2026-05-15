import React, { memo, useRef, useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet, Text, View } from "react-native";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import InfoBlock from "./InfoBlock";
import { Movie } from "../types";
import { PressableScale } from "react-native-pressable-scale";
import PosterModal from "./PosterModal";
import { MONTH } from "@/utils/month";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderContainer from "@/components/ui/header-container";
import { BlurTargetView, BlurView } from "expo-blur";

function MainInfo(
  { movie, inCinemas = false, maximum, posterPath, backdropPath, title, cast, ref }
    : {
      movie?: Movie,
      inCinemas: boolean,
      maximum?: string,
      posterPath?: string,
      backdropPath?: string,
      title?: string,
      cast?: any[],
      ref: any,
    }
) {

  if (!backdropPath)
    backdropPath = movie?.images?.backdrops[movie?.images?.backdrops?.length - 1]?.file_path;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const insets = useSafeAreaInsets();

  const poster = (
    <>
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie?.id}-poster`}
        source={{ uri: `https://image.tmdb.org/t/p/w300${posterPath ?? movie?.poster_path}` }}
        style={styles.posterImage}
        cachePolicy="memory-disk"
      />
      {
        inCinemas && maximum && (
          <View style={styles.inCinemasStripe}>
            <Text style={[textStyle.white12, styles.inCinemasStripeText]}>
              {`In cinemas till ${maximum?.slice(8, 10) + ' ' + MONTH[maximum.slice(5, 7)]}`}
            </Text>
          </View>
        )
      }
    </>
  );

  const backdropRef = useRef<View | null>(null);

  return (
    <HeaderContainer>
      <ReturnArrowButton />
      <BlurTargetView style={styles.backdrop} ref={backdropRef}>
        <AnimatedFastImage
          sharedTransitionTag={`movie-${movie?.id}-backdrop`}
          source={{ uri: `https://image.tmdb.org/t/p/w300${backdropPath}` }}
          style={{ height: "100%", width: "100%" }}
          cachePolicy="disk"
        />
      </BlurTargetView>
      <BlurView
        tint="systemUltraThinMaterial"
        intensity={60}
        blurReductionFactor={30}
        blurMethod="dimezisBlurView"
        style={[{ height: hp(40), width: wp("100%"), position: "absolute", top: 0, left: 0, right: 0, marginLeft: "-3%" }]}
        blurTarget={backdropRef}
      />
      <View style={[styles.darkRect, { paddingTop: insets.top / 2 }]}>
        <View style={{ flexDirection: "column", marginLeft: "3%", marginTop: "20%", justifyContent: "space-between" }}>

          <AnimatedFastText style={[textStyle.white24, { maxWidth: "96%" }]}
            sharedTransitionTag={`movie-${movie?.id}-title`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title ?? movie?.title}
          </AnimatedFastText>

          <View style={
            {
              flexDirection: "row",
              marginTop: "3%",
              width: wp(95),
              height: 220,
              justifyContent: "space-between",
            }
          }>

            <PressableScale
              onPress={() => { setIsOpen(true); }}
              style={styles.posterView}
            >
              {poster}
            </PressableScale>
            <InfoBlock movieInfo={movie} cast={cast} />
          </View>
        </View>
      </View>
      <PosterModal
        isOpen={isOpen}
        posterPath={posterPath}
        onClose={() => { setIsOpen(false) }}
        movieID={movie?.id}
        ref={ref}
      />
    </HeaderContainer>
  )
};

export default memo(MainInfo);

const styles = StyleSheet.create({
  backdrop: {
    height: hp("40%"),
    marginLeft: "-3%",
    marginTop: "-25%",
    marginBottom: "5%",
  },
  darkRect: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    marginRight: "-2%",
    marginTop: "-2%",
    height: hp("40%"),
    position: "absolute",
    margin: "-2%",
    width: "104%",
  },
  posterView: {
    width: "40%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
  },
  posterImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  inCinemasStripe: {
    top: "3%",
    width: "100%",
    position: "absolute",
    backgroundColor: "rgba(50, 158, 79, 0.9)"
  },
  inCinemasStripeText: {
    textTransform: "uppercase",
    textAlign: "center",
    alignSelf: "center"
  },
});