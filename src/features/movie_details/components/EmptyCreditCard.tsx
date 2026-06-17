import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { textStyle } from "@/styles/textStyles";

interface Props {
  movieID: number; 
  posterPath: string, 
  title: string,
};

export default function EmptyCreditCard({ movieID, posterPath, title}: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname:  "/(app)/movie_credits",
          params: {
            movieID, 
            posterPath,
            title,
          }
        })
      }
      style={styles.view}>
      <Image
        source={require("@/assets/images/threeDots.png")}
        style={styles.image}
      />
      <Text style={[textStyle.gray20]}>More</Text>
    </TouchableOpacity>
  )
};

const styles = {
  view: {
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
  },
  image: {
    height: 20,
    width: 20,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    alignSelf: "center"
  }
};