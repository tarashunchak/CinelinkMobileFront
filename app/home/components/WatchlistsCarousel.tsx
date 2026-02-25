import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, ScrollView, Text, View } from "react-native";

export type WatchlistCard = {
  id: number;
  fg_img_url: string;
}

export default function WatchlistsCarousel() {
  const navigator = useNavigation();
  const [watchlists, setWatchlists] = useState();

  /*useEffect(() => {
    async function loadMovies() {
      const data = await getNowPlayingMovies();
      if (data) {
        setMovies(data.results)
        nowPlayingMoviesId.length = 0;
      }
    }
    loadMovies();
  }, []);*/


  return (
    <ScrollView
      style={[styles.scrollView]}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity key={index} style={styles.view}
        onPress={() => navigator?.push("MovieDetailScreen",
          {
            movieId: movie?.id,
            inCinemas: true,
            maximum
          }
        )}>
        <View>
          <Image style={styles.poster}
            source={{ uri: "https://image.tmdb.org/t/p/w200" + movie?.poster_path }} />
          <View style={styles.info.view}>
            <Text style={styles.info.text}>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView >
  )
}

const styles: object = {
  scrollView: {
    height: 160,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 4,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
    marginLeft: "-1%",
    marginRight: "-1%",
  },
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
  info: {
    view: {
      position: "absolute",
      top: "3%",
      width: "100%",
      backgroundColor: "rgba(50, 158, 79, 0.9)",
      borderWidth: 0.5,
      borderColor: "rgba(255, 255, 255, 0.4)"
    },
    text: [
      textStyle.white10,
      {
        textTransform: "uppercase",
        textAlign: "center",
        alignSelf: "center"
      }
    ]
  }
}