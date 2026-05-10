import { useNavigation } from "expo-router";
import React, { memo } from "react";
import { Text, View, StyleSheet, useAnimatedValue } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { MONTH } from "@/utils/month";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { Skeleton } from "react-native-skeletons";
import Animated, { createAnimatedComponent, useAnimatedProps } from "react-native-reanimated";

export interface MovieCard_I {
  movie_id: number;
  poster_path: string;
  maximum?: string;
  inCinemas: boolean;
}

function MovieCard({ data }: { data: MovieCard_I }) {
  const navigator = useNavigation();
  if (!data) return <Skeleton style={styles.view} />

  const AnimatedFastImage = createAnimatedComponent(Image);

  return (
    <PressableScale style={styles.view}
      onPress={() => navigator?.push("MovieDetailScreen",
        {
          movieID: data?.movie_id,
          inCinemas: data?.inCinemas,
          maximum: data?.maximum,
          posterPath: data?.poster_path,
        }
      )}>
      <View>
        <AnimatedFastImage
          sharedTransitionTag={`movie-${data?.movie_id}-poster`}
          style={styles.poster}
          source={{ uri: "https://image.tmdb.org/t/p/w300" + data?.poster_path }}
          cachePolicy="memory-disk"
        />
        {
          data?.inCinemas &&
          <View style={styles.inCinemasView}>
            <Text style={[textStyle.white10, styles.inCinemasText]}>
              {`till ${(data?.maximum?.slice(3, 4) + ' ' + MONTH[data?.maximum?.slice(5, 7)])}`}
            </Text>
          </View>
        }
      </View>
    </PressableScale >
  )
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  view: {
    marginRight: 5,
    width: 100,
    height: "99%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: 4,
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 4
  },
  inCinemasView: {
    position: "absolute",
    top: "3%",
    width: "100%",
    backgroundColor: "rgba(50, 158, 79, 0.9)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.4)"
  },
  inCinemasText: {
    textTransform: "uppercase",
    textAlign: "center",
    alignSelf: "center"
  }
});