import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image, ImageBackground, Text, View } from "react-native";
import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import InfoBlock from "./InfoBlock";
import { Movie } from "../types";

export default function MainInfo({ movie, inCinemas = false }: { movie: Movie, inCinemas: boolean }) {
  const navigation = useNavigation();
  const backdropPath = movie?.images?.backdrops[movie?.images?.backdrops?.length - 1]?.file_path;
  return (
    <View>
      <LeafyReturnArrowButton style={{ marginTop: "5%", zIndex: 2 }} onPress={() => navigation.goBack()} />
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${backdropPath}` }}
        style={styles.backdrop}>
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

              <View style={styles.poster}>
                <Image
                  source={{ uri: "https://image.tmdb.org/t/p/w300" + movie?.poster_path }}
                  style={{ height: "100%", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)" }} />
                {
                  inCinemas ? (
                    <View style={{ position: "absolute", top: "3%", width: "100%", backgroundColor: "rgba(50, 158, 79, 0.9)" }}>
                      <Text style={[textStyle.white12, { textTransform: "uppercase", textAlign: "center", alignSelf: "center" }]}>{`In cinemas till ${(maximum.slice(3, 5) + ' ' + MONTH[maximum.slice(0, 2)])}`}</Text>
                    </View>
                  ) : (<></>)
                }
              </View>

              <InfoBlock movieInfo={movie} />

            </View>
          </View>
        </View>
      </ImageBackground >
    </View >
  )
}

const styles = {
  backdrop: {
    height: hp("40%"),
    width: "104%",
    marginLeft: "-3%",
    marginRight: "-3%",
    marginTop: "-25%",
  },
  darkRect: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    marginRight: "-2%",
    marginTop: "1%",
    height: hp("40%"),
  },
  poster: {
    width: "42%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
  },
};