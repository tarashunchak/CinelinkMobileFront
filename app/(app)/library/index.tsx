import React, { useEffect, memo } from "react";
import { FlatList } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import WatchlistCard from "./components/WatchlistCard";
import LibraryHeader from "./components/LibraryHeader";
import ScreenBackground from "@/components/ui/screen-background";
import { useUserWatchlists } from "../rt_client/managers/watchlists_manager";
import Spacer from "@/components/ui/spacer";

function LibraryScreen() {
  const watchlists = useUserWatchlists();

  useEffect(() => {
  }, []);

  return (
    <>
      <LibraryHeader />
      <FlatList
        data={watchlists}
        keyExtractor={(item: any, index: number) => String(item?.id ?? index)}
        renderItem={({ item }) =>
          <WatchlistCard watchlist={item} />
        }
        ListFooterComponent={<Spacer orientation="v" spacing={hp(9)}/>}
      />
    </>
  );
};

export default memo(LibraryScreen);

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