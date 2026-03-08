import React from "react";
import { useNavigation } from "expo-router";
import { Image, Text, TouchableOpacity } from "react-native";
import { Cast } from "../types";
import { textStyle } from "@/styles/textStyles";

export default function CreditCard({ credit }: { credit: Cast }) {
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      style={styles.view}
      onPress={() => navigator?.push("ActorProfileScreen", { personID: credit.id })}>
      <Image source={{
        uri: credit?.profile_path ? "https://image.tmdb.org/t/p/w200" + credit?.profile_path
          : "https://i.pinimg.com/736x/b9/bb/27/b9bb27a7fc1941680ce9f75481df60bb.jpg"
      }}
        style={styles.img} />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={textStyle.white12}
      >
        {credit?.name}
      </Text>
      <Text style={textStyle.gray12} numberOfLines={1}
        ellipsizeMode="tail">{credit?.character}</Text>
      <Text style={textStyle.yellow12} >{credit?.known_for_department}</Text>
    </TouchableOpacity>
  );
}

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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0.5,
  },
  img: {
    height: "70%",
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
};