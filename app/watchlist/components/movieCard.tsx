import { textStyle } from "@/styles/textStyles";
import React from "react";
import { Linking, Platform, TouchableOpacity, View, Text, Image } from "react-native";
import { movieCardStyle } from "@/styles/movieCardStyle";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Movie } from "../../movie_details/types";
import { useNavigation } from "expo-router";
import GenresList from "@/components/ui/leafy-genres-list";
import GenresLayout from "./genresLayout";


export default function MovieCard({ movie }: { movie: Movie }) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity style={[movieCardStyle?.backgroundStyle]} onPress={() => {
      navigator?.push("MovieDetailScreen", { movieId: movie?.movie_id });
    }}>
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w300" + movie.poster_path }}
        style={movieCardStyle.moviePosterStyle}
        pointerEvents="none"
      />
      <View style={{ flexDirection: "column", height: "100%", marginLeft: "4%", justifyContent: "space-evenly" }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Text style={movieCardStyle.movieTitleStyle}
            pointerEvents="none"
            numberOfLines={1}
            ellipsizeMode="tail">{movie?.title}</Text>
          <Text style={[movieCardStyle.movieYearStyle, textStyle.gray16]} pointerEvents="none">{` (${movie?.release_date?.slice(0, 4)})`}</Text>
        </View>

        <TouchableOpacity style={movieCardStyle.imdbText.view}
          onPress={async () => {
            const url = `https://www.imdb.com/title/${movie?.imdb_id}`;
            const sup = await Linking.canOpenURL(url);
            if (sup) Linking.openURL(url);
          }}
        >
          <Text style={movieCardStyle.imdbText.text}>
            {
              `IMDb: ${movie?.imdb_rating?.toFixed(1)}`
            }
          </Text>
        </TouchableOpacity>

        <GenresLayout genres={movie?.genres} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  card: {
    view: {
      flexDirection: "row",
      gap: 10,
      width: "98%",
      height: hp("13%"),
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 0.5,
      borderRadius: 4,
      paddingLeft: "3%",
      marginBottom: 5,
      alignSelf: "center",
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
        title: [textStyle.white18, {
          maxWidth: "85%",
          minWidth: "85%",
        }],
        imdb: {
          view: {
            backgroundColor: "#DEB522",
            width: 54,
            height: 18,
            borderRadius: 4,
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

/* <TouchableOpacity style={styles.card.view}
        onPress={() => navigator.push("MovieDetailScreen", { movieId: movie?.movie_id })}>
        <Image style={styles.card.content.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${movie?.poster_path}` }} />
        <View style={styles.card.content.columnInfo.view}>
          <Text style={styles.card.content.columnInfo.title}
            pointerEvents="none"
            numberOfLines={1}
            ellipsizeMode="tail">{movie?.title}</Text>
          <View style={styles.card.content.columnInfo.imdb.view}>
            <Text style={styles.card.content.columnInfo.imdb.text}>
              {`IMDb: ${movie?.imdb_rating?.toFixed(1)}`}
            </Text>
          </View>

          <GenresLayout genres={movie?.genres} />
        </View>
      </TouchableOpacity >*/