import { textStyle } from "@/styles/textStyles";
import { useNavigation, useRouter } from "expo-router";
import React, { memo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { PressableScale } from "react-native-pressable-scale";
import { createAnimatedComponent } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { useUserRecommendations } from "@/src/rt_client/managers/recommendations_manager";

type RecommendedBy_T = {
  user_id: number;
  username: string;
  avatar_url: string;
  message: string;
};

export type RecommendedCard_T = {
  movie_id: number;
  imdb_id: number;
  poster_path: string;
  title: string;
  imdb_rating: number;
  recommended_by: RecommendedBy_T[];
};

const AnimatedFastImage = createAnimatedComponent(Image);

const RecommendationItem = memo(({ item }: { item: RecommendedCard_T }) => {
  const router = useRouter();
  const handlePress = useCallback(()=>{
    router.navigate({ 
      pathname: "/movie_details", 
      params: { 
        movieID: item.movie_id, 
        posterPath: item.poster_path,
        title: item.title,
      }
    });
  }, [item?.movie_id]);
  return (
    <PressableScale
      activeScale={0.98}
      style={styles.cardContainer}
      onPress={handlePress}
    >
      <AnimatedFastImage 
        sharedTransitionTag={`movie-${item?.movie_id}-poster`}
        style={styles.poster} 
        source={{ uri: `https://image.tmdb.org/t/p/w300${item?.poster_path}` }} 
        cachePolicy="memory"
      />
      <View style={styles.infoColumn}>
        <Text style={[styles.title, textStyle.white20]}
          pointerEvents="none"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item?.title}
        </Text>
        <View style={styles.imdbBadge}>
          <Text style={[styles.imdbText, textStyle.black12]}>
            {`IMDb: ${item?.imdb_rating.toFixed(1)}`}
          </Text>
        </View>
        <View style={styles.recommendedSection}>
          <Text style={textStyle.gray14}>
            Recommended by:
          </Text>
          <View style={styles.avatarRow}>
            {
              item?.recommended_by?.slice(0, 3)?.map((user: any, index: number) => (
                <Image key={user?.user_id} style={styles.avatarItem} source={{ uri: user?.avatar_url }} />
              ))
            }
            {
              item?.recommended_by?.length > 3 &&
              <Text style={[textStyle?.gray14]}>{`+${item?.recommended_by?.length}`}</Text>
            }
          </View>
        </View>
      </View>
    </ PressableScale>
  );
});

function RecommendationsList() {
  const items = useUserRecommendations();
  const renderItem = useCallback(({ item }: any) => (
    <RecommendationItem item={item} />
  ), [items]);

  //console.warn("Recommendations: ", items);
  return (
    <FlatList
      data={items}
      keyExtractor={(item: RecommendedCard_T, index) => String(item?.movie_id)}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

export default memo(RecommendationsList);

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    height: hp("14.5%"),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 15,
    paddingVertical: 1,
    paddingLeft: "3%",
    marginBottom: 5,
  },
  poster: {
    width: 73,
    height: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignSelf: "center",
  },
  infoColumn: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  title: {
    maxWidth: "85%",
    minWidth: "85%",
  },
  imdbBadge: {
    backgroundColor: "#DEB522",
    width: 54,
    height: 18,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  imdbText: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
  },
  recommendedSection: {
    height: "40%",
    width: 130,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 4,
    paddingLeft: "1%",
    paddingBottom: "1%",
  },
  avatarRow: {
    flexDirection: "row",
    gap: 5,
    paddingLeft: "2%",
  },
  avatarItem: {
    minHeight: 28,
    aspectRatio: 1 / 1,
    borderRadius: 999,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: "1%",
    paddingTop: "3%",
  },
});