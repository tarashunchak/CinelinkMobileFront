import React, { memo, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import { useRouter } from "expo-router";

interface Props {
  credit: any; 
  onPress?: ()=>void;
};

function CreditCard({ credit, onPress }: Props) {
  const router = useRouter();
  if (!credit) return <Skeleton style={styles.view} />

  const handlePress = useCallback(()=>{
    router.push({
        pathname: "/credit_details",
        params: {
          creditID: credit.id,
          creditName: credit.name,
          profilePath: credit.profile_path
        }
    })
  }, [credit?.id]);

  const profile = useMemo(()=>(
    credit?.profile_path ?
      { uri: `https://image.tmdb.org/t/p/w300${credit?.profile_path}` }
      : require("@/assets/images/empty_male_card.jpg")
  ), [credit.id]);

  return (
    <PressableScale
      style={styles.view}
      onPress={handlePress}>
      <AnimatedFastImage
        sharedTransitionTag={`credit-${credit.id}-profile`}
        source={profile}
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
      <Text 
        style={textStyle.gray12} 
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {credit?.character ?? "N/A"}
      </Text>
      <Text style={textStyle.yellow12}>
        {credit?.known_for_department}
      </Text>
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