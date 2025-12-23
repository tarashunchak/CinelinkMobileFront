import { getNowPlayingMovies } from "@/api/tmdbApi";
import { MONTH } from "@/utils/month";
import { nowPlayingMoviesId } from "@/utils/nowPlaying";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Image, ScrollView, Text, View } from "react-native";

export default function PremiereCarousel() {
  const navigator = useNavigation();
  const [movies, setMovies] = useState();

  useEffect(() => {
    async function loadMovies() {
      const data = await getNowPlayingMovies();
      if (data) {
        setMovies(data.results)
        nowPlayingMoviesId.length = 0;
      }
    }
    loadMovies();
  }, []);

  const maximum = movies?.dates?.maximum?.slice(5, 10);

  return (
    <View>
      <Text style={styles.text}>
        Now in cinemas
      </Text>
      <ScrollView
        style={[styles.scrollView]}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {
          movies?.results?.map((movie: any, index: number) => {
            nowPlayingMoviesId.push(movie?.id);
            return (
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
                      {`till ${(maximum.slice(3, 5) + ' ' + MONTH[maximum.slice(0, 2)])}`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView >
    </View>
  )
}

const styles: object = {
  text: [
    textStyle.white22,
    { marginTop: "10%" }
  ],
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