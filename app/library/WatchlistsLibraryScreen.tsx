import React, { useState, useCallback } from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import BottomBar from "../bars/bottomBar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { viewStyle } from "@/styles/viewStyle";
import { textStyle } from "@/styles/textStyles";
import { GetUserWatchlists } from "@/api/watchlist/watchlist";
import WatchlistCard from "./components/watchlistCard";
import LibraryHeader from "./components/Header";
import { useFocusEffect, useNavigation } from "expo-router";

export default function WatchlistsScreen() {
  const navigator = useNavigation();
  const [watchlists, setWatchlists] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadWatchlists() {
        const data = await GetUserWatchlists(1);
        if (!data) return;
        setWatchlists(data);
      }

      loadWatchlists();
    }, [])
  )

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require("@/assets/images/background.png")} style={viewStyle.imageBackground}>
        <ScrollView>
          <LibraryHeader />
          <View style={{ gap: 5 }}>
            {
              watchlists?.sort((a: any, b: any) => { return a.movies_quantity > b.movies_quantity }).map((item: any, index: number) => (
                <WatchlistCard key={index} watchlist={item} />
              ))
            }
          </View>
        </ScrollView>
      </ImageBackground>
      <BottomBar />
    </View>
  );
}

const styles = {
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

/*
 <TouchableOpacity style={styles.card.view}>
            <Image source={require("@/app/screens/WatchlistsPage/assets/NoFgWatchlist.png")} style={styles.card.image} />
            <View style={styles.card.text.view}>
              <Text style={styles.card.text.name}>Marked as favorite</Text>
              <Text style={styles.card.text.description}
                pointerEvents="none"
                numberOfLines={3}
                ellipsizeMode="tail">Watchlists based on movies that you mark as favorite</Text>
              <View style={styles.card.text.creator.view}>
                <Text style={styles.card.text.creator.header}>Creator:</Text>
                <Text style={styles.card.text.creator.name}>Baraq Obama</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card.view}>
            <Image source={require("@/app/screens/WatchlistsPage/assets/NoFgWatchlist.png")} style={styles.card.image} />
            <View style={styles.card.text.view}>
              <Text style={styles.card.text.name}>Marked as favorite</Text>
              <Text style={styles.card.text.description}
                pointerEvents="none"
                numberOfLines={3}
                ellipsizeMode="tail">Watchlists based on movies that you mark as favorite</Text>
              <View style={styles.card.text.creator.view}>
                <Text style={styles.card.text.creator.header}>Creator:</Text>
                <Text style={styles.card.text.creator.name}>Baraq Obama</Text>
              </View>
            </View>
          </TouchableOpacity>

*/