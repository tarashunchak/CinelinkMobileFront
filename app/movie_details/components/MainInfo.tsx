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
import { Skeleton } from "react-native-skeletons";
import Animated, { createAnimatedComponent } from "react-native-reanimated";
import { Image } from "expo-image";

export default function MainInfo(
  { movie, inCinemas = false, maximum, posterPath, backdropPath}
    : {
      movie?: Movie,
      inCinemas: boolean,
      maximum?: string,
      posterPath?: string,
      backdropPath?: string,
    }
) {

  if (!backdropPath)
    backdropPath = movie?.images?.backdrops[movie?.images?.backdrops?.length - 1]?.file_path;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const AnimatedFastImage = createAnimatedComponent(Image);

  const poster = (
    <>
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie?.id}-poster`}
        source={{ uri: `https://image.tmdb.org/t/p/w300${posterPath ?? movie?.poster_path}`}}
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
    <View>
      <ReturnArrowButton style={{ marginTop: "5%", zIndex: 2 }} />
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie?.id}-backdrop`}
        source={{ uri: `https://image.tmdb.org/t/p/w500${backdropPath}` }}
        style={styles.backdrop}
        cachePolicy="memory-disk"
      />
      <View style={styles.darkRect}>
        <View style={{ flexDirection: "column", marginLeft: "3%", marginTop: "20%", justifyContent: "space-between" }}>

          <Text style={[textStyle.white26, { marginTop: "5%" }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {movie?.title}
          </Text>

          <View style={
            {
              flexDirection: "row",
              marginTop: "3%",
              width: "90%",
              height: 220,
              justifyContent: "space-between"
            }
          }>

            <PressableScale
              onPress={() => { setIsOpen(true); }}
              style={styles.posterView}
            >
              {poster}
            </PressableScale>
            <InfoBlock movieInfo={movie} />
          </View>
        </View>
      </View>
      {
        movie && <PosterModal
          isOpen={isOpen}
          posterUrl={movie?.poster_path}
          onClose={() => { setIsOpen(false) }}
        />
      }
    </View >
  )
};

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
    width: "42%",
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