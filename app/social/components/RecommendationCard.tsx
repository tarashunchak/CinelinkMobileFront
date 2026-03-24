import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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

export default function RecommendedCard({ item }: { item: RecommendedCard_T }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.card.view}
      onPress={() => navigation?.navigate("MovieDetailScreen", { movieID: item?.movie_id })} >
      <Image style={styles.card.content.poster} source={{ uri: `https://image.tmdb.org/t/p/w300${item?.poster_path}` }} />
      <View style={styles.card.content.columnInfo.view}>
        <Text style={styles.card.content.columnInfo.title}
          pointerEvents="none"
          numberOfLines={1}
          ellipsizeMode="tail">{item?.title}</Text>
        <View style={styles.card.content.columnInfo.imdb.view}>
          <Text style={styles.card.content.columnInfo.imdb.text}>
            {`IMDb: ${item?.imdb_rating.toFixed(1)}`}
          </Text>
        </View>
        <View style={styles.card.content.columnInfo.recommendedBy.view}>
          <Text style={styles.card.content.columnInfo.recommendedBy.header}>
            Recommended by:
          </Text>
          <View style={styles.card.content.columnInfo.recommendedBy.avatars.view}>
            {
              item?.recommended_by?.slice(0, 3)?.map((user: any, index: number) => (
                <Image key={index} style={styles.card.content.columnInfo.recommendedBy.avatars.item} source={{ uri: user?.avatar_url }} />
              ))
            }
            {
              item?.recommended_by?.length > 3 &&
              <Text style={[textStyle?.gray14]}>{`+${item?.recommended_by?.length}`}</Text>
            }
          </View>
        </View>
      </View>
    </ TouchableOpacity>
  );
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
          minWidth: "85%",
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
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 0.5,
            borderRadius: 4,
            paddingLeft: "1%",
            paddingBottom: "1%",
          },
          header: [textStyle.gray12, {

          }],
          avatars: {
            view: {
              flexDirection: "row",
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