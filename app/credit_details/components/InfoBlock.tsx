import React, { memo } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import InfoRow from "./InfoRow";
import { PressableScale } from "react-native-pressable-scale";
import { Skeleton } from "react-native-skeletons";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

interface CreditInfo_I {
  id: number;
  name: string;
  original_name: string;
  imdb_id: string;
};

const GENDER = {
  0: "Not specified",
  1: "Female",
  2: "Male",
};

function InfoBlock({ creditInfo }: { creditInfo: CreditInfo_I }) {
  if (!creditInfo) return <Skeleton style={styles.mainView}/>
  return (
    <View style={styles.mainView}>
        <InfoRow left="Birthday" right={creditInfo?.birthday} />
        <InfoRow left="Deathday" right={creditInfo?.deathday} />
        <InfoRow left="Gender" right={GENDER[creditInfo?.gender]} />
        <InfoRow left="Place of birth" right={creditInfo?.place_of_birth} />
        <InfoRow left="Department" right={creditInfo?.known_for_department} />
        <InfoRow left="Popularity" right={String(creditInfo?.popularity?.toFixed(4))} />

      <PressableScale style={styles.imdbBtnView}
        onPress={async () => {
          const url = `https://www.imdb.com/name/${creditInfo?.imdb_id}`;
          const sup = await Linking.canOpenURL(url);
          if (sup) Linking.openURL(url);
        }}
      >
        <Text style={styles.imdbBtnText}>IMDb</Text>
      </PressableScale >
    </View >
  )
};

export default memo(InfoBlock);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "column",
    width: wp(52),
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 5,
    padding: "1.3%",
    justifyContent: "space-evenly",
  },
  imdbBtnView: {
    backgroundColor: "#deb522",
    height: 24,
    borderRadius: 5,
    width: 76,
    flexDirection: "column",
    justifyContent: "center",
  },
  imdbBtnText: {
    textAlign: "center",
    fontSize: 14,
    color: "black",
    fontWeight: "bold",
  },
  starsView: {
    flexDirection: "column",
    maxWidth: "100%",
  },
});