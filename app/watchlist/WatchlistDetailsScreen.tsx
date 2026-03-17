import MovieCardList from "@/components/ui/leafy-film-list";
import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, Image, ImageBackground, ScrollView, View, TouchableOpacity } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import BottomBar from "@/app/bars/bottomBar";
import { GetWatchlistMovies } from "@/api/watchlist/watchlist";
import MovieCard from "@/app/watchlist/components/movieCard";
import { Movie } from "@/app/movie_details/types";
import { Watchlist } from "@/app/library/components/watchlistCard";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";

export default function WatchlistDetailsScreen({ route }: any) {
  const [watchlistMovies, setWatchlistMovies] = useState<any>();
  const watchlist = route?.params?.watchlist;

  const navigator = useNavigation();
  useEffect(() => {
    async function loadWatchlistMovies() {
      const movies = await GetWatchlistMovies(watchlist?.id);
      setWatchlistMovies(movies);
    }
    loadWatchlistMovies();
  }, []);

  return (
    <ImageBackground source={require("@/assets/images/background.png")} style={{ flex: 1 }}>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require("@/app/library/assets/NoBgWatchlist.jpeg")} style={{ height: hp("45%"), width: "100%", marginBottom: hp("1%") }} >
          <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: hp(1.5), paddingLeft: hp(0.5), paddingBottom: 0 }}>
            <LeafyReturnArrowButton onPress={() => navigator.goBack()} />
            <Image source={require("@/app/watchlist/assets/InfoIcon.png")}
              style={[{ height: 26, width: 26 }]} />
          </TouchableOpacity>
          <View style={{ justifyContent: "flex-end", height: hp("41%") - 26 }}>
            <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
              <View style={[styles.info.view]}>
                <Image source={watchlist?.fg_img_url ? { uri: watchlist?.fg_img_url } : require("@/app/library/assets/NoFgWatchlist.png")} style={styles.info.image} />

                <View style={styles.card.text.view}>
                  <Text style={styles.card.text.name}>{watchlist?.name}</Text>
                  <Text style={styles.card.text.description}
                    pointerEvents="none"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {watchlist?.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.card.text.creator.view}
                    onPress={() => navigator.navigate("UserProfileScreen", { userID: watchlist?.creator_id })}>
                    <Text style={styles.card.text.creator.header}>Creator:</Text>
                    <Text style={styles.card.text.creator.name}>{watchlist?.creator_username}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[textStyle.gray14]}>
                {`${watchlist?.movies_quantity} ${watchlist?.movies_quantity === 1 ? "movie" : "movies"}`}
              </Text>
            </View>
          </View>
        </ImageBackground>
        {
          (
            <>
              {
                watchlistMovies?.map((item: Movie, index: number) => <MovieCard key={index} movie={item} />)
                ??
                <Text style={[textStyle.gray32, { alignSelf: "center", opacity: 0.4, marginTop: hp("20%") }]}>Watchlist is empty</Text>
              }
              <View style={{ height: hp(8) }}></View>
            </>
          )
        }
      </ScrollView >
      <BottomBar />
    </ImageBackground >
  )
}


const styles = {
  info: {
    view: {
      height: hp("15%"),
      width: wp("100%"),
      backgroundColor: "rgba(255,255, 255, 0.05)",
      borderColor: "rgba(255,255, 255, 0.2)",
      borderWidth: 0.8,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      padding: hp("1%"),
      gap: hp("2%"),
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    image: {
      width: hp("13%"),
      aspectRatio: 1,
      borderRadius: 4,
    }
  },
  card: {
    view: {
      gap: 10,
      height: hp("15%"),
      backgroundColor: "rgba(255, 255, 255, 0.03)",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.05)",
      padding: hp("0.5%"),
      flexDirection: "row",
    },
    image: {
      height: "100%",
      width: "30%",
      resizeMode: "cover",
      borderRadius: 4,
    },
    text: {
      view: {
        flexDirection: "column",
        gap: 2,
      },
      name: [textStyle.yellow22, {

      }],
      description: [textStyle.gray16, {
        maxWidth: "75%",
        minWidth: "75%",
      }],
      creator: {
        view: {
          flexDirection: "row",
          gap: 5,
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 3,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          padding: 2,
          alignSelf: "flex-start",
        },
        header: [textStyle.gray14, {

        }],
        name: [textStyle.yellow14, {

        }],
      }
    }
  }
}