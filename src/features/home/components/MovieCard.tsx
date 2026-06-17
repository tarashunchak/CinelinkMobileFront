import { useNavigation, useRouter } from "expo-router";
import React, { memo, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { MONTH } from "@/utils/month";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";

export interface MovieCard_I {
  movie_id: number;
  poster_path: string;
  maximum?: string;
  inCinemas: boolean;
  title: string;
}

function MovieCard({ data }: { data: MovieCard_I }) {
  const router = useRouter();
  if (!data) return <Skeleton style={styles.view} />
  const handlePress = useCallback(() => {
    router.navigate({
      pathname: "/(app)/movie",
      params: {
        movieID: data?.movie_id,
        inCinemas: data?.inCinemas,
        maximum: data?.maximum,
        posterPath: data?.poster_path,
        title: data?.title,
      },
    });
  }, [data.movie_id]);

  return (
    <PressableScale style={styles.view}
      onPress={handlePress}
    >
      <View>
        <AnimatedFastImage
          sharedTransitionTag={`movie-${data?.movie_id}-poster`}
          style={styles.poster}
          source={{ uri: "https://image.tmdb.org/t/p/w300" + data?.poster_path }}
          cachePolicy="disk"
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
      <AnimatedFastText
        sharedTransitionTag={`movie-${data?.movie_id}-title`}
        style={{ opacity: 0, }}
      >
        {data?.title}
      </AnimatedFastText>
    </PressableScale >
  )
};

export default memo(MovieCard, (prev, next) => {
  return prev.data.movie_id === next.data.movie_id &&
    prev.data.poster_path === next.data.poster_path;
});

const styles = StyleSheet.create({
  view: {
    marginRight: 5,
    width: 100,
    height: "99%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
    padding: 2.5,
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 3
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