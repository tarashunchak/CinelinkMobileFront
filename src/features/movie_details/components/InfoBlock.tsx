import React, { memo, useCallback } from "react";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import InfoRow from "./InfoRow";
import { Movie } from "../types";
import { Skeleton } from "react-native-skeletons";
import { JumpingTransition } from "react-native-reanimated";
import { PressableScale } from "react-native-pressable-scale";
import { widthPercentageToDP } from "react-native-responsive-screen";

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

export default function InfoBlock({ movieInfo, cast }: { movieInfo: Movie | undefined, cast: any[] | undefined }) {
  if (!movieInfo) return <Skeleton style={styles.mainView} />
  const openIMDb = useCallback(async ()=>{
    const url = `https://www.imdb.com/title/${movieInfo?.imdb_id}`;
    const sup = await Linking.canOpenURL(url);
    if (sup) Linking.openURL(url);
  },[movieInfo?.imdb_id]);
  return (
    <View style={styles.mainView}>
      <InfoRow left="Year" right={movieInfo?.release_date?.slice(0, 4) || "N/A"} />
      <InfoRow left="Director" right={movieInfo?.directors?.[0] || "N/A"} />

      <View style={styles.starsView}>
        <Text style={textStyle.yellow16}>{"Stars: "}</Text>
        {
          cast?.map((star, _) =>
            <Text 
              key={star?.id} 
              style={[textStyle.white16, {marginLeft: 10, maxWidth:"90%", minWidth:"80%" }]}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {`* ${star?.name}`}
            </Text>
          )
        }
      </View>

      <InfoRow left="Runtime" right={`${movieInfo.runtime} min`} />

      <PressableScale 
        activeScale={0.95}
        style={styles.imdbView}
        onPress={openIMDb}
      >
        <Text style={styles.imdbText}>
          {
            `IMDb: ${movieInfo?.vote_average.toFixed(1)}`
          }
        </Text>
      </PressableScale>
    </View >
  )
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    width: widthPercentageToDP(52),
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 5,
    padding: "1.3%",
    justifyContent: "space-evenly",
  },
  imdbView: {
    backgroundColor: "#deb522",
    height: 24,
    borderRadius: 5,
    width: 76,
    flexDirection: "column",
    justifyContent: "center"
  },
  imdbText: {
    textAlign: "center",
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  starsView: {
    flexDirection: "column",
    maxWidth: "100%",
  },
});