import React, { memo } from "react";
import { useNavigation } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { textStyle } from "./../../../styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { Skeleton } from "react-native-skeletons";

function CreditCard({ credit }: { credit: any}) {
  const navigator = useNavigation();
  if (!credit) return <Skeleton style={styles.view} />

  return (
    <PressableScale
      style={styles.view}
      onPress={() => navigator?.push("CreditDetailScreen", { creditID: credit.id })}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w200${credit?.profile_path}` }}
        style={styles.img}
        cachePolicy="memory-disk"
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={textStyle.white12}
      >
        {credit?.name}
      </Text>
      <Text style={textStyle.gray12} numberOfLines={1}
        ellipsizeMode="tail">{credit?.character ?? "N/A"}</Text>
      <Text style={textStyle.yellow12} >{credit?.known_for_department}</Text>
    </PressableScale>
  );
};

export default memo(CreditCard);

const styles = StyleSheet.create({
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
});