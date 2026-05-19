import React, { useState } from "react";
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
import HeaderContainer from "@/components/ui/header-container";

export default function MainInfo(
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

  if (!backdropPath || backdropPath.length === 0)
    backdropPath = movie?.images?.backdrops[movie?.images?.backdrops?.length - 1]?.file_path;

  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  return (
    <>
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie?.id}-backdrop`}
        source={{ uri: `https://image.tmdb.org/t/p/w500${backdropPath}` }}
        style={styles.backdrop}
        cachePolicy="disk"
      />
      <View style={[styles.darkRect]}>
        <HeaderContainer style={styles.headerContainer}>
          <ReturnArrowButton style={{ marginTop: "2%" }} />
          <View style={{ gap: 5 }}>
            <AnimatedFastText
              style={[textStyle.white26, { maxWidth: "98%" }]}
              sharedTransitionTag={`movie-${movie?.id}-title`}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title ?? movie?.title}
            </AnimatedFastText>

            <View style={styles.mainView}>
              <PressableScale
                onPress={() => { setIsOpen(true); }}
                style={styles.posterView}
              >
                {poster}
              </PressableScale>
              <InfoBlock movieInfo={movie} cast={cast} />
            </View>
          </View>
        </HeaderContainer>
      </View>
      <PosterModal
        isOpen={isOpen}
        posterPath={posterPath}
        onClose={() => { setIsOpen(false) }}
        movieID={movie?.id}
        ref={ref}
      />
    </>
  )
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: hp("45%"),
    marginHorizontal: "-2%",
  },
  darkRect: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    height: hp("45%"),
    marginHorizontal: "-2%",
    width: "104%",
  },
  headerContainer: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "space-between",
    width: wp(98),
    height: "100%"
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
  mainView: {
    flexDirection: "row",
    width: wp(98),
    height: 220,
    justifyContent: "space-between",
  }
});