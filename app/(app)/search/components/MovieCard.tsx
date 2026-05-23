import AnimatedFastImage from "@/components/ui/animated-fast-image";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";

function MovieCard({ movie }: { movie: any }) {
  const navigator = useNavigation();
  console.warn("Movie card data: ", movie);
  return (
    <PressableScale style={styles.view}
      onPress={() => {
        navigator.navigate(
          "MovieDetailScreen",
          { 
            movieID: movie?.movie_id,
            posterPath: movie?.poster_path,
            title: movie?.title,
          }
        )
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <AnimatedFastImage
          sharedTransitionTag={`movie-${movie?.id}-poster`}
          style={styles.poster}
          source={{ uri: `https://image.tmdb.org/t/p/w300/${movie?.poster_path}` }}
          cachePolicy="disk"
        />
        <View style={styles.infoView}>
          <AnimatedFastText
            sharedTransitionTag={`movie-${movie?.id}-title`}
            style={[textStyle.yellow18, styles.title]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {movie?.title}
          </AnimatedFastText>
          <View style={styles.imdbView}>
            <Text style={[textStyle?.black12, styles.imdbText]}>
              {`IMDb: ${movie?.imdb_rating?.toFixed(2)}`}
            </Text>
          </View>
          <Text style={textStyle.gray14}>
            3 friends watched
          </Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "column", justifyContent: "space-between" }}
      >
        <View>
          <Image
            style={styles.actions}
            source={require("@/app/(app)/search/assets/addToLib.png")}
          />
        </View>
        <View>
          <Image
            style={styles.actions}
            source={require("@/app/(app)/search/assets/remove.png")}
          />
        </View>
      </View>
    </PressableScale >
  );
};

export default memo(MovieCard);

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: 76,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 6,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  poster: {
    height: "100%",
    aspectRatio: 0.7,
  },
  infoView: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  title: {
    maxWidth: "85%",
    minWidth: "85%",
  },
  imdbView: {
    backgroundColor: "#DEB522",
    width: 54,
    height: 18,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  imdbText: {
    alignSelf: "center",
    textAlign: "center",
  },
  actions: {
    width: 32,
    height: 32,
  }
});