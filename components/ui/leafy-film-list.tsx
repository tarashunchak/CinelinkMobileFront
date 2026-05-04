import { getMoviesByGenre, getPopularMovies, getSimilarMovies } from "@/api/tmdbApi";
import { getCurrentGenre, setCurrentGenre } from "@/utils/homePage";
import { nowPlayingMoviesId } from "@/utils/nowPlaying";
import { movieCardStyle } from "@/styles/movieCardStyle";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { textStyle } from "../../styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  vote_average: Float;
  poster_path: string;
  directors: string[];
  release_date: string;
  providers: any;
  imdb_id: string;
}

interface MovieCardListParams {
  selectedGenre: number | any;
  movieID: number | any;
  movieGenre: number | any;
}

export default function MovieCardList({ selectedGenre, movieID, movieGenre }: MovieCardListParams) {
  const navigation = useNavigation();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadmovies() {
      console.warn("prevGenre: ", getCurrentGenre(), "\n");
      console.warn("current: ", selectedGenre, "\n");

      if (movieID) {
        const data = await getSimilarMovies(movieID) || await getMoviesByGenre(movieGenre);

        setMovies(data);
        return;
      } else {
        if (getCurrentGenre() !== selectedGenre || !selectedGenre) {

          setCurrentGenre(selectedGenre);

          const data = getCurrentGenre() ? await getMoviesByGenre(getCurrentGenre()) : await getPopularMovies();
          if (data) setMovies(data);

          return;
        }
      }
      console.log("same genre pressed — no reload");
    }
    loadmovies()
  }, [selectedGenre, movieID]);


  return (
    <View style={styles.mainView}>
      {
        movies?.map((movie, index) =>
        (
          nowPlayingMoviesId.includes(movie?.id) ?
            null
            :
            (
              <PressableScale key={index} style={[movieCardStyle?.backgroundStyle]} onPress={() => {
                const id = movie.id;
                console.log("MovieID pre: ", id);
                navigation?.push("MovieDetailScreen", { movieID: id });
              }}>
                <Image
                  source={{ uri: "https://image.tmdb.org/t/p/w300" + movie.poster_path }}
                  style={movieCardStyle.moviePosterStyle}
                  pointerEvents="none"
                />
                <View style={{ flexDirection: "column", height: "100%", marginLeft: "6%", justifyContent: "space-evenly" }}>
                  <View style={{ flexDirection: "column", height: "30%" }}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                      <Text style={movieCardStyle.movieTitleStyle}
                        pointerEvents="none"
                        numberOfLines={1}
                        ellipsizeMode="tail">{movie?.title}</Text>
                      <Text style={[movieCardStyle.movieYearStyle, textStyle.gray16]} pointerEvents="none">{` (${movie?.release_date.slice(0, 4)})`}</Text>
                    </View>
                    <Text style={movieCardStyle.movieDirectorStyle} pointerEvents="none">{movie?.directors?.at(0)}</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: "2%", height: 20 }}>
                    {
                      movie?.providers?.["US"]?.flatrate?.slice(0, (Math.min(8, movie?.providers?.["US"]?.flatrate?.length)))?.map((flat: any, index: number) => (
                        <Image key={index} source={{ uri: "https://image.tmdb.org/t/p/w200" + movie?.providers?.["US"]?.flatrate?.[index]?.logo_path }} style={{ height: 20, width: 20 }} />
                      ))
                    }
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
                        `IMDb: ${movie?.vote_average.toFixed(1)}`
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              </PressableScale >
            )
        )
        )}
    </View>
  )
};

const styles = StyleSheet.create({
  mainView: {
    position: "relative",
    backgroundColor: "transparent",
    marginTop: "2%",
    marginBottom: hp(Platform.OS === "ios" ? "10%" : "7.8%")
  }
});