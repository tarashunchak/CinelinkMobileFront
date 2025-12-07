import { textStyle } from "@/styles/textStyles";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { WatchlistMovie } from "../WatchlistDetailsScreen";
import { Movie } from "../../MovieDetailsPage/types";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <TouchableOpacity style={styles.card.view}>
      <Image style={styles.card.content.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${movie?.poster_path}` }} />
      <View style={styles.card.content.columnInfo.view}>
        <Text style={styles.card.content.columnInfo.title}
          pointerEvents="none"
          numberOfLines={1}
          ellipsizeMode="tail">{movie?.title}</Text>
        <View style={styles.card.content.columnInfo.imdb.view}>
          <Text style={styles.card.content.columnInfo.imdb.text}>
            {`IMDb: ${movie?.vote_average}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity >
  );
};

export type RecommendedMovie = {
  movie_id: number;
  movie_title: string;
  users: {

  };
};

const styles = {
  card: {
    view: {
      flexDirection: "row",
      gap: 10,
      width: "100%",
      height: hp("14.5%"),
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 0.5,
      borderRadius: 4,
      paddingLeft: "3%",
      marginBottom: 5,
    },
    content: {
      poster: {
        height: "98%",
        aspectRatio: 2.2 / 3,
        backgroundColor: "white",
        alignSelf: "center",
      },
      columnInfo: {
        view: {
          flexDirection: "column",
          justifyContent: "space-evenly",
        },
        title: [textStyle.white20, {
          maxWidth: "85%",
        }],
        imdb: {
          view: {
            backgroundColor: "#DEB522",
            width: 54,
            height: 18,
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "center",
          },
          text: [textStyle.black12, {
            alignSelf: "center",
            textAlign: "center",
          }]
        },
        recommendedBy: {
          view: {
            height: "40%",
            width: 130,
            flexDirection: "column",
            justifyContent: "space-evenly",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            paddingLeft: "1%",
          },
          header: [textStyle.gray12, {

          }],
          avatars: {
            view: {
              flexDirection: "row",
              justifyContent: "space-evenly",
              gap: 5,
              paddingLeft: "2%",
            },
            item: {
              minHeight: 28,
              aspectRatio: 1 / 1,
              borderRadius: 999,
              backgroundColor: "white",
            }
          }
        }
      }
    }
  }
};