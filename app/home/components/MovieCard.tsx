import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { MONTH } from "@/utils/month";

export interface MovieCard_I {
  movie_id: number;
  poster_path: string;
  maximum: string | null;
  inCinemas: boolean;
}

export default function MovieCard({ data }: { data: MovieCard_I }) {
  const navigator = useNavigation();
  //console.warn(`MovieCard movie_id = ${data?.movie_id}`);
  return (
    <TouchableOpacity style={styles.view}
      onPress={() => navigator?.push("MovieDetailScreen",
        {
          movieID: data?.movie_id,
          inCinemas: data?.inCinemas,
        }
      )}>
      <View>
        <Image style={styles.poster}
          source={{ uri: "https://image.tmdb.org/t/p/w200" + data?.poster_path }} />
        {data?.inCinemas &&
          <View style={styles.inCinemas.view}>
            <Text style={styles.inCinemas.text}>
              {`till ${(data?.maximum?.slice(3, 5) + ' ' + MONTH[data?.maximum?.slice(0, 2)])}`}
            </Text>
          </View>
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = {
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
  inCinemas: {
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