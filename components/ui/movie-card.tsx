import React, { memo, useCallback } from "react";
import { PressableScale } from "react-native-pressable-scale";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { textStyle } from "@/styles/textStyles";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastImage from "./animated-fast-image";

export interface MovieCard_I {
  id?: number;
  title?: string;
  poster_path?: string;
  providers?: any;
  imdb_id?: string;
  vote_average?: number;
  directors?: any[];
};

function MovieCard({ movie }: { movie: MovieCard_I | null }) {
  const navigation = useNavigation();
  if (!movie) return <Skeleton style={styles.mainView} />

  const providers = movie?.providers?.["US"]?.flatrate?.slice(0, (Math.min(8, movie?.providers?.["US"]?.flatrate?.length)))?.map((flat: any, index: number) => (
    <Image
      source={{ uri: "https://image.tmdb.org/t/p/w200" + movie?.providers?.["US"]?.flatrate?.[index]?.logo_path }}
      style={{ height: 20, width: 20 }}
      cachePolicy="memory-disk"
    />
  ));

  const openIMDb = useCallback(async () => {
    const url = `https://www.imdb.com/title/${movie?.imdb_id}`;
    const sup = await Linking.canOpenURL(url);
    if (sup) Linking.openURL(url);
  }, [movie?.imdb_id])

  return (
    <PressableScale style={styles.mainView} onPress={() => {
      navigation?.push("MovieDetailScreen", { 
        movieID: movie?.id,
        posterPath: movie?.poster_path,
        title: movie?.title,
      });
    }}>
      <AnimatedFastImage
        sharedTransitionTag={`movie-${movie?.id}-poster`}
        source={{ uri: `https://image.tmdb.org/t/p/w300${movie?.poster_path}`}}
        style={styles.poster}
        pointerEvents="none"
        cachePolicy="disk"
      />
      <View style={styles.mainInfoView}>
        <View style={styles.columnTextInfo}>
          <View style={styles.titleView}>
            <Text style={[textStyle.white16, styles.title]}
              pointerEvents="none"
              numberOfLines={1}
              ellipsizeMode="tail">{movie?.title}</Text>
            <Text
              style={[textStyle.gray16, styles.year]}
              pointerEvents="none"
            >
              {` (${movie?.release_date.slice(0, 4)})`}
            </Text>
          </View>
          <Text
            style={[textStyle.gray12, styles.director]}
            pointerEvents="none">
            {movie?.directors?.[0]}
          </Text>
        </View>
        <View style={{ flexDirection: "row", gap: "2%", height: 20 }}>
        </View>
        <TouchableOpacity style={styles.imdbView}
          onPress={openIMDb}
        >
          <Text style={[textStyle.black12, styles.imdbText]}>
            {`IMDb: ${movie?.vote_average?.toFixed(1)}`}
          </Text>
        </TouchableOpacity>
      </View>
    </PressableScale >
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.20)",
    height: 118,
    width: "100%",
    marginTop: "1.5%",
    borderRadius: 15,
    padding: "1%",
    paddingRight: "5%",
    paddingLeft: "5%",
    flexDirection: "row",
  },
  title: {
    marginTop: "-1%",
    minWidth: "1%",
    maxWidth: "75%",
    textAlign: "left",
  },
  year: {
    marginTop: "-1%",
    textAlign: "left",
  },
  director: {
    marginTop: 2,
  },
  imdbView: {
    backgroundColor: "#deb522",
    height: 20,
    borderRadius: 4,
    width: 64,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imdbText: {
    fontWeight: "bold",
  },
  poster: {
    width: 73,
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  columnTextInfo: {
    flexDirection: "column",
    height: "30%"
  },
  mainInfoView: {
    flexDirection: "column",
    height: "100%",
    marginLeft: "6%",
    justifyContent: "space-evenly"
  },
});

export default memo(MovieCard);