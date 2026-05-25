import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";

interface CreditCard_I {
  credit_id: number;
  name: string;
  profile_path: string;
  known_for_department: string;
  gender: number;
}

export default function CreditCard({ credit }: { credit: CreditCard_I }) {
  const navigator = useNavigation();

  const creditProfile = { uri: `https://image.tmdb.org/t/p/w300/${credit?.profile_path}` };

  const openCreditDetails = useCallback(() => {
        navigator.navigate(
          "CreditDetailScreen",
          { 
            creditID: credit?.credit_id,
            profilePath: credit?.profile_path,
            creditName: credit?.name,
          }
        )
      }
, [credit?.credit_id]);

  return (
    <PressableScale 
      style={styles.view}
      onPress={openCreditDetails}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <AnimatedFastImage
          sharedTransitionTag={`credit-${credit?.credit_id}-profile`}
          style={styles.profile}
          source={creditProfile}
          cachePolicy="disk"
        />
        <View style={{ flexDirection: "column" }}>
          <AnimatedFastText
            sharedTransitionTag={`credit-${credit?.credit_id}-name`}
            style={[
              textStyle.yellow18,
              styles.name
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {credit?.name}
          </AnimatedFastText>
          <Text style={textStyle.gray16}>
            {`Department: ${credit?.known_for_department}`}
          </Text>
        </View>
      </View>
      <View
        style={{ flexDirection: "column", justifyContent: "space-between" }}
      >
      </View>
    </PressableScale >
  )
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: 76,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 6,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  name: {
    maxWidth: "85%",
    minWidth: "85%",
  },
  profile: {
    height: 76,
    width: 54,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0.5,
  }
});
