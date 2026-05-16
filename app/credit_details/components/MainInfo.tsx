import React, {useState} from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StyleSheet, View } from "react-native";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import InfoBlock from "./InfoBlock";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import HeaderContainer from "@/components/ui/header-container";
import { PressableScale } from "react-native-pressable-scale";
import PosterModal from "@/app/movie_details/components/PosterModal";

export interface CreditMainInfo_I {
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
  imdb_id: number;
};

export default function MainInfo(
  { creditID, creditName, credit, backdrop, profilePath, ref }
    : {
      creditID: number,
      creditName: string,
      credit?: CreditMainInfo_I,
      backdrop: string[],
      profilePath?: string,
      ref: any,
    }
) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <View>
      <AnimatedFastImage
        source={{ uri: `https://image.tmdb.org/t/p/w500${backdrop?.[backdrop?.length - 1] ?? ""}` }}
        style={styles.backdrop}
      />
      <View style={styles.darkRect}>
        <HeaderContainer style={{ flexDirection: "column", alignSelf: "center", justifyContent: "space-between", width: wp(98) }}>
          <ReturnArrowButton />
          <AnimatedFastText
            sharedTransitionTag={`credit-${creditID}-name`}
            style={[textStyle.white24, { width: "98%", marginTop: "5%" }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {creditName}
          </AnimatedFastText>
          <View style={styles.mainView}>
            <View style={
              {
                flexDirection: "row",
                marginTop: "3%",
                width: wp(96),
                height: 220,
                justifyContent: "space-between",
                alignSelf: "center",
              }
            }>

              <PressableScale
                onPress={() => {setIsOpen(true)}}
                style={styles.poster}
              >
                <AnimatedFastImage
                  sharedTransitionTag={`credit-${credit?.id}-profile`}
                  source={{ uri: `https://image.tmdb.org/t/p/w300${profilePath}` }}
                  style={styles.image}
                  cachePolicy="disk"
                />
              </PressableScale>
              <InfoBlock creditInfo={credit} />
            </View>
          </View>
        </HeaderContainer>
      </View>
      <PosterModal
        isOpen={isOpen}
        onClose={()=>{setIsOpen(false)}}
        profilePath={profilePath}
        ref={ref}
        creditID={credit?.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: hp("40%"),
    marginHorizontal: "-2%",
  },
  darkRect: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    height: hp("40%"),
    marginHorizontal: "-2%",
    width: "104%",
  },
  poster: {
    width: "40%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    position: "relative",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)"
  },
  mainView: {
    flexDirection: "row",
    width: wp(100),
    height: 220,
    justifyContent: "space-between",
  }
});