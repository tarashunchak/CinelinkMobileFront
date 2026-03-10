import React from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import InfoRow from "./InfoRow";

interface Credits {
  cast: any[];
  crew: any[];
};

interface CreditInfo_I {
  id: number;
  name: string;
  original_name: string;
  imdb_id: string;
};

const GENDER = {
  0: "female",
  1: "male",
}

export default function InfoBlock({ creditInfo }: { creditInfo: CreditInfo_I }) {
  if (!creditInfo) return null
  return (
    <View style={styles.mainView}>
      <View>
        <InfoRow left="Birthday" right={creditInfo?.birthday} />
        <InfoRow left="Deathday" right={creditInfo?.deathday} />
        <InfoRow left="Gender" right={GENDER[creditInfo?.gender]} />
        <InfoRow left="Place of birth" right={creditInfo?.place_of_birth} />
        <InfoRow left="Department" right={creditInfo?.known_for_department} />
        <InfoRow left="Popularity" right={String(creditInfo?.popularity?.toFixed(4))} />
      </View>

      <TouchableOpacity style={styles.imdbBtn.view}
        onPress={async () => {
          const url = `https://www.imdb.com/title/${creditInfo?.imdb_id}`;
          const sup = await Linking.canOpenURL(url);
          if (sup) Linking.openURL(url);
        }}
      >

        <Text style={styles.imdbBtn.text}>IMDb</Text>
      </TouchableOpacity>
    </View >
  )
};

const styles = {
  mainView: {
    flexDirection: "column",
    marginLeft: "3%",
    width: "62%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.10)",
    borderRadius: 5,
    padding: "1.5%",
    justifyContent: "space-between",
  },
  imdbBtn: {
    view: {
      backgroundColor: "#deb522",
      height: 24,
      borderRadius: 5,
      width: 76,
      flexDirection: "column",
      justifyContent: "center",
    },
    text: {
      textAlign: "center",
      fontSize: 14,
      color: "black",
      fontWeight: "bold",
    },
  },
  starsView: {
    flexDirection: "column",
    maxWidth: "100%",
  },
}