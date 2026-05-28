import React, { memo } from "react";
import { StyleSheet, View, Text } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { textStyle } from "@/styles/textStyles";
import { useNavigation, useRouter } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";
import Animated, { SharedTransition } from "react-native-reanimated";
import { Skeleton } from "react-native-skeletons";
import { Image } from "expo-image";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";

export interface Watchlist {
  id: number;
  name: string;
  description: string;
  creator_id: number;
  creator_username: string;
  fg_img_url: string;
  bg_img_url: string;
  is_public: boolean;
  movies_quantity: number;
};

function WatchlistCard({ watchlist }: { watchlist: Watchlist | null }) {
  const router = useRouter();

  if (!watchlist) return <Skeleton style={styles.view} />;

  return (
    <PressableScale style={styles.view}
      onPress={() => { 
        router.push({
          pathname: "/watchlist", 
          params: { watchlist: JSON.stringify(watchlist) },
        }) 
        }}>
      <View style={{ width: "80%", height: "100%", flexDirection: "row" }}>
        <View style={{ flexDirection: "row", gap: 5 }}>

          <AnimatedFastImage
            sharedTransitionTag={`watchlist-fg-${watchlist?.id}`}
            source={
             { uri: watchlist?.fg_img_url }
            }
            style={styles.image}
            cachePolicy="disk"
          />

          <View style={styles.textView}>
            <Text style={textStyle.white22}>{watchlist.name}</Text>
            <Text style={[textStyle.gray18, styles.description]}
              pointerEvents="none"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {watchlist.description}
            </Text>
            <View style={styles.creator}>
              <Text style={textStyle.gray14}>Creator:</Text>
              <Text style={textStyle.yellow14}>{watchlist?.creator_username}</Text>
            </View>
          </View>
        </View>
        <Text style={textStyle.gray14}>
          {`${watchlist.movies_quantity} ${watchlist.movies_quantity === 1 ? "movie" : "movies"}`}
        </Text>
      </View>
    </PressableScale>
  );
};

export default memo(WatchlistCard);

const styles = StyleSheet.create({
  view: {
    gap: 10,
    height: hp("15%"),
    width: "98%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    padding: hp("0.5%"),
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: "1%",
  },
  image: {
    height: "100%",
    width: "35%",
    resizeMode: "cover",
    borderRadius: 4,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
  },
  textView: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1%",
  },

  description: {
    maxWidth: "70%",
    minWidth: "70%",
  },
  creator: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 3,
    padding: 4,
    alignSelf: "flex-start",
  },
});