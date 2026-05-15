import React, { memo } from "react";
import { useNavigation } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { textStyle } from "./../../../styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import AnimatedFastText from "@/components/ui/animated-fast-text";

function CreditCard({ credit }: { credit: any}) {
  const navigator = useNavigation();
  if (!credit) return <Skeleton style={styles.view} />

  return (
    <PressableScale
      style={styles.view}
      onPress={() => navigator?.navigate(
        "CreditDetailScreen", 
        { creditID: credit.id, creditName: credit.name, profilePath: credit.profile_path }
        )}>
      <AnimatedFastImage
        sharedTransitionTag={`credit-${credit.id}-profile`}
        source={{ uri: `https://image.tmdb.org/t/p/w300${credit?.profile_path}` }}
        style={styles.img}
        cachePolicy="disk"
      />
      <AnimatedFastText
        sharedTransitionTag={`credit-${credit.id}-name`}
        numberOfLines={1}
        ellipsizeMode="tail"
        style={textStyle.white12}
      >
        {credit?.name}
      </AnimatedFastText>
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