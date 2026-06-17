import { memo, useCallback } from "react";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { PressableScale } from "react-native-pressable-scale";
import HeaderContainer from "@/src/components/ui/header-container";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { textStyle } from "@/styles/textStyles";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen"
import { useNavigation, useRouter } from "expo-router";
import { Info } from "lucide-react-native";

export default function Header({ watchlist }: { watchlist: any }) {
  const router = useRouter();
  const handlePress = useCallback(()=>{
    router.push({
      pathname: "/profile",
      params: {
        userID: watchlist?.creator_id,
      }
    })
  }, []);
  return (
    <HeaderContainer style={{height: hp(45), flexDirection: "column", justifyContent: "space-between"}}>
      <Image
        source={require("@//assets/images/NoBgWatchlist.jpeg")}
        style={[StyleSheet.absoluteFillObject, styles.bgImage]}
        cachePolicy="disk"
      />
      <View style={styles.buttonsRow}>
        <ReturnArrowButton />
        <PressableScale style={styles.infoBtnView}>
          <Info size={26} />
        </PressableScale>
      </View>

      <View style={[]}>
        <View style={styles.mainView}>
          <View style={styles.infoView}>
            <AnimatedFastImage
              sharedTransitionTag={`watchlist-fg-${watchlist?.id}`}
              source={
                { uri: watchlist?.fg_img_url }
              }
              style={styles.image}
              cachePolicy="disk"
            />
            <View style={styles.textView}>
              <Text style={[styles.nameText, textStyle.yellow22]}>
                {watchlist?.name}
              </Text>
              <Text
                style={[styles.descriptionText, textStyle.gray16]}
                pointerEvents="none"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {watchlist?.description}
              </Text>
              <TouchableOpacity
                style={styles.creatorTileView}
                onPress={handlePress}>
                <Text style={textStyle.gray14}>Creator:</Text>
                <Text style={textStyle.yellow14}>
                  {watchlist?.creator_username}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[textStyle.gray14]}>
            {`${watchlist?.movies_quantity} ${watchlist?.movies_quantity === 1 ? "movie" : "movies"}`}
          </Text>
        </View>
      </View>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: hp("45%"),
    width: "100%",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: hp(1),
  },
  infoBtnView: {
    height: 26,
    width: 26
  },
  infoBtnImage: {
    height: "100%",
    width: "100%",
  },
  emptyWatchlist: {
    alignSelf: "center",
    opacity: 0.4,
    marginTop: hp("20%")
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    maxHeight: 140,
  },
  creatorTileView: {
    flexDirection: "row",
    gap: 5,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 2,
    alignSelf: "flex-start",
  },
  descriptionText: {
    maxWidth: "75%",
    minWidth: "75%",
  },
  nameText: {
    maxWidth: "75%",
    minWidth: "75%",
  },
  image: {
    width: hp("13%"),
    aspectRatio: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#909090",
  },
  infoView: {
    height: hp("15%"),
    width: wp("100%"),
    backgroundColor: "rgba(255,255, 255, 0.05)",
    borderColor: "rgba(255,255, 255, 0.2)",
    borderWidth: 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: hp("1%"),
    gap: hp("2%"),
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  textView: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%",
  }
});