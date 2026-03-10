import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Image, ImageBackground, Text, View } from "react-native";
import LeafyReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import InfoBlock from "./InfoBlock";
//import InfoBlock from "./InfoBlock";

export interface CreditMainInfo_I {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  imdb_id: number;
};

export default function MainInfo({ credit }: { credit: CreditMainInfo_I }) {
  const navigation = useNavigation();
  return (
    <View>
      <LeafyReturnArrowButton style={{ marginTop: "5%", zIndex: 2 }} onPress={() => navigation.goBack()} />
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${null}` }}
        style={styles.backdrop}>
        <View style={styles.darkRect}>
          <View style={{ flexDirection: "column", marginLeft: "3%", marginTop: "20%", justifyContent: "space-between" }}>
            <Text style={[textStyle.white26, { marginTop: "5%" }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {credit?.name}
            </Text>
            <View style={styles.mainView}>
              <View style={styles.poster}>
                <Image
                  source={{ uri: "https://image.tmdb.org/t/p/w300" + credit?.profile_path }}
                  style={{ height: "100%", width: "100%", backgroundColor: "rgba(255, 255, 255, 0.05)" }} />
              </View>
              <InfoBlock creditInfo={credit} />
            </View>
          </View>
        </View>
      </ImageBackground >
    </View >
  )
}

const styles = {
  backdrop: {
    height: hp("40%"),
    width: "104%",
    marginLeft: "-3%",
    marginRight: "-3%",
    marginTop: "-25%",
  },
  darkRect: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    marginRight: "-2%",
    marginTop: "1%",
    height: hp("40%"),
  },
  poster: {
    width: "42%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
  },
  mainView: {
    flexDirection: "row",
    marginTop: "3%",
    width: "90%",
    height: 220,
    justifyContent: "space-between"
  }
};