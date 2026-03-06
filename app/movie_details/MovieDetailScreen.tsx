import { getDetailedMovieByID } from "@/api/tmdbApi";
import BottomBar from "@/app/bars/bottomBar";
import { MONTH } from "@/utils/month";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MovieCardList from "@/components/ui/leafy-film-list";
import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { genresInfo } from "@/styles/genreStyle";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, ImageBackground, Linking, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"; import { heightPercentageToDP } from "react-native-responsive-screen";
import YoutubePlayer from "react-native-youtube-iframe";
import ActorCard from "./components/CreditsCard";
import DetailRow from "./components/DetailRow";
import { Movie } from "./types";
import { AddWatchlistItem } from "@/api/watchlist/watchlist";
import { CURRENT_USER } from "@/api/currentUser";
import MainInfo from "./components/MainInfo";
import DetailsBlock from "./components/DetailsBlock";


const { width: screenW, height: screenH } = Dimensions.get("window");

export default function MovieDetailScreen({ route }: any) {
  const navigation = useNavigation();
  const [movie, setMovie] = useState<Movie>();
  console.log("Movie ID in moviedetailsscreen: ", route?.params?.movieId || 13);

  const inCinemas: boolean = route?.params?.inCinemas;
  const maximum = route?.params?.maximum;

  useEffect(() => {
    async function loadMovieDetails() {
      const data: Movie = await getDetailedMovieByID(route?.params?.movieId || 13);
      if (!data) return;
      data.directors = data.credits.crew?.filter(member => member.job === "Director").map(member => member.name);
      setMovie(data);
    }
    loadMovieDetails();
  }, []);

  const trailerKey = movie?.videos?.results?.find(
    video => video.site === "YouTube" && video.type === "Trailer"
  )?.key;

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>

        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: "1%" }}>

          <MainInfo movie={movie} inCinemas={inCinemas} />

          <View style={styles.actionRow.view}>
            <TouchableOpacity style={styles.actionRow.markAsWatchedBtn}
              onPress={() => {
                const item: WatchlistItem_T = {
                  id: 0,
                  movie_id: movie?.id,
                  user_id: CURRENT_USER.UID
                };
                AddWatchlistItem(item);
              }}>
              <Text style={[textStyle.white18, { width: "100%", textAlign: "center" }]}>Add to Watchlist</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow.shareBtn}>
              <Text style={[textStyle.white18, { width: "100%", textAlign: "center" }]}>Recommend</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionView}>
            <Text style={[textStyle.yellow18, { padding: 0, marginBottom: 5 }]}>Genres</Text>
            <ScrollView horizontal={true}
              style={styles.genreCellView}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              {
                movie?.genres.map((genre, index) => {
                  const name: string = genre.name;
                  return (
                    <Pressable key={index}
                      style={
                        [
                          styles.genreCell,
                          {
                            backgroundColor: genresInfo[name]?.color,
                            borderColor: genresInfo[name]?.borderColor
                          }
                        ]
                      }>
                      <Text style={[styles.genreCellText]}>{name}</Text>
                    </Pressable>
                  )
                })
              }
            </ScrollView>
          </View>

          {
            movie?.providers?.["US"]?.length &&
            (<View style={styles.sectionView}>
              <Text style={[textStyle.yellow18]}>Providers</Text>
              <ScrollView horizontal={true}
                style={[styles.genreCellView, { height: 40 }]}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                showsHorizontalScrollIndicator={false}
              >
                {
                  movie?.providers?.["US"]?.flatrate?.map((flat: any, index: number) => (
                    <Image key={index} source={{ uri: "https://image.tmdb.org/t/p/w500" + flat?.logo_path }} style={{ height: 32, width: 32, borderRadius: 4, marginRight: "4" }} />
                  ))
                }
              </ScrollView>
            </View>
            )
          }

          <Text style={[{ width: "80%", marginTop: "5%" }, textStyle.yellow20]}>Trailer</Text>
          <View style={{ marginLeft: "0%", marginTop: "1%" }}>
            <YoutubePlayer height={250} width={"100%"} play={false} videoId={trailerKey} />
          </View>

          <View style={[styles.sectionView, { flexDirection: "column" }]}>
            <Text style={textStyle.yellow20}>Overview</Text>
            <Text style={[{ width: "100%", textAlign: "justify" }, textStyle.white16]}>   {movie?.overview}</Text>
          </View>

          <DetailsBlock movie={movie} />

          <View style={{ width: "100%", marginTop: "5%" }}>

            <Text style={styles.credits.text}>Cast</Text>
            <ScrollView horizontal={true} style={styles.credits.view}>
              {[
                movie?.credits?.cast?.slice(0, Math.min(6, movie.credits.cast.length - 1)).map((person, index) =>
                  <ActorCard key={index} cast={person} />
                ),
                emptyCreditCard(movie?.credits, movie?.poster_path)
              ]}
            </ScrollView>

            <Text style={styles.credits.text}>Crew</Text>
            <ScrollView horizontal={true} style={styles.credits.view}>
              {[
                movie?.credits?.crew?.slice(0, Math.min(6, movie.credits.crew.length - 1))?.map((person: any, index: any) => {
                  return (
                    <ActorCard key={index} cast={person} />
                  )
                }),
                emptyCreditCard(movie?.credits, movie?.poster_path)
              ]}
            </ScrollView>

          </View>

          <Text style={[textStyle.yellow20, { marginTop: "5%" }]}>Similar movies</Text>
          <MovieCardList navigation={navigation} movieID={movie?.id} movieGenre={movie?.genres[0]?.id} />
        </ScrollView >
      </ImageBackground >
      <BottomBar />
    </View >
  );
}

function emptyCreditCard(credits: any, poster_path: any) {
  const navigation = useNavigation();
  return (<TouchableOpacity
    key={7}
    onPress={() => navigation.push("MovieCreditsScreen", { credits: credits, poster: poster_path })}
    style={[{
      flexDirection: "column",
      height: 175,
      width: 110,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.2)",
      margin: 1.5,
      marginRight: 5,
      justifyContent: "center",
      alignItems: "center",
      padding: 0.5,
    }]}>
    <Image source={require("@/assets/images/threeDots.png")}
      style={{ height: 20, width: 20, borderTopLeftRadius: 6, borderTopRightRadius: 6, alignSelf: "center" }} />
    <Text style={[textStyle.gray20]}>More</Text>
  </TouchableOpacity>
  )
}

const styles = {
  mainScrollView: {
    flex: 1,
    padding: "2.5%",
    paddingTop: 0,
  },
  sectionView: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
  },
  ImageBackground: {
    height: hp("40%"),
    width: "104%",
    marginLeft: "-3%",
    marginRight: "-3%",
    marginTop: "-25%"
  },
  mainView: {
    movieBasicInfo: {
      title: {
        fontFamily: "sans-serif-condensed",
        fontSize: 26,
        color: "white",
        maxWidth: "100%",
        alignSelf: "left",
        marginTop: "5%",
      },
      view: {
        flexDirection: "row",
        marginTop: "3%",
        width: "90%",
        height: 220,
        justifyContent: "space-between"
      },
      posterView: {
        width: "42%",
        height: "100%",
        backgroundColor: "white",
        position: "relative",
      },
      infoView: {
        view: {

        },
        textInfoView: {
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: 4,
          padding: "1%",
        },
        yearView: {
          flexDirection: "row",
        },
        directorView: {
          flexDirection: "row",
          maxWidth: "100%",
        },
        starsView: {
          flexDirection: "column",
          maxWidth: "100%",
        },
        stars: {
          marginLeft: 15,
          fontSize: 14,
        },
        imdbText: {
          view: {

          },
          text: {

          }
        },
      },
    },
  },
  genreCellView: {
    height: 30,
    width: "100%",
    alignSelf: "left",
  },
  genreCell: {
    flexDirection: "column",
    height: 26,
    borderRadius: 6,
    minWidth: 50,
    alignItems: "center",
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 8,
    borderWidth: 1,
    justifyContent: "center",
  },
  genreCellText: {
    fontFamily: "sans-serif-condensed",
    color: "white",
    fontSize: 14,
    alignSelf: "center",
  },
  actionRow: {
    view: {
      marginBottom: "5%",
      marginTop: "15%",
      flexDirection: "row",
      paddingLeft: 2,
      paddingRight: 2,
      height: 42,
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderWidth: 0.5,
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: 12,
    },
    saveBtn: {
      borderRadius: 10,
      borderColor: "rgba(254, 211, 48, 0.3)",
      backgroundColor: "#deb522",
      borderWidth: 0.5,
      height: 36,
      width: 64,
      flexDirection: "row",
      alignItems: "center",
    },
    markAsWatchedBtn: {
      //borderRadius: 5,
      borderColor: "rgba(0, 92, 77, 0.4)",
      backgroundColor: "rgba(0, 92, 77, 0.7)",
      borderWidth: 0.5,
      height: 36,
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 10,
    },
    shareBtn: {
      borderRadius: 10,
      borderColor: "rgba(48, 130, 254, 0.3)",
      backgroundColor: "rgba(48, 130, 254, 1)",
      //backgroundColor: "rgba(48, 130, 254, 0.6)",
      borderWidth: 0.5,
      height: 36,
      width: "48%",
      flexDirection: "row",
      alignItems: "center",
      //borderRadius: 10,
    }
  },
  credits: {
    view: {
      borderColor: "rgba(255, 255, 255, 0.1)",
      borderRadius: 10,
      borderWidth: 1,
    },
    text: [
      textStyle.yellow20,
      {
        marginLeft: "2%",
        marginTop: "5%",
      }
    ],
  }
};