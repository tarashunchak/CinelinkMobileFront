import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import InfoRow from "./InfoRow";
import { Movie } from "../types";

interface Credits {
  cast: any[];
  crew: any[];
};

interface MovieInfo {
  release_date: string;
  directors: any[];
  credits: Credits;
  runtime: string;
  imdb_id: string;
  vote_average: number;
};

export default function InfoBlock({ movieInfo }: { movieInfo: Movie | undefined }) {
  if (!movieInfo) return null
  return (
    <View style={styles.mainView}>
      <InfoRow left="Year" right={movieInfo?.release_date?.slice(0, 4)} />
      <InfoRow left="Director" right={movieInfo?.directors[0]} />

      <View style={styles.starsView}>
        <Text style={textStyle.yellow16}>{"Stars: "}</Text>
        {
          movieInfo?.credits?.cast?.slice(
            0, Math.min(4, movieInfo?.credits?.cast?.length)
          ).map((star, index) =>
            <Text key={index} style={
              textStyle.white16
            }>
              {`${star.name}`}
            </Text>
          )
        }
      </View>

      <InfoRow left="Runtime" right={`${movieInfo.runtime} min`} />

      <TouchableOpacity style={styles.imdbBtn.view}
        onPress={async () => {
          const url = `https://www.imdb.com/title/${movieInfo?.imdb_id}`;
          const sup = await Linking.canOpenURL(url);
          if (sup) Linking.openURL(url);
        }}
      >

        <Text style={styles.imdbBtn.text}>
          {
            `IMDb: ${movieInfo?.vote_average.toFixed(1)}`
          }
        </Text>
      </TouchableOpacity>
    </View >
  )
};

const styles = {
  mainView: {
    flexDirection: "column",
    marginLeft: "3%",
    width: "62%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 5,
    padding: "1.5%",
  },
  imdbBtn: {
    view: {
      backgroundColor: "#deb522",
      height: 24,
      borderRadius: 5,
      width: 76,
      flexDirection: "column",
      justifyContent: "center"
    },
    text: {
      textAlign: "center",
      fontSize: 14,
      color: "black",
      fontWeight: "bold",
    },
  },
  starsView: {
    flexDirection: "column",
    maxWidth: "100%",
  },
}