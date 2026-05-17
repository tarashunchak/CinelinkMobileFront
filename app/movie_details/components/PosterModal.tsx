import React, { memo } from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import { BlurView } from "expo-blur";

interface Props {
  isOpen: boolean;
  posterUrl: string;
  onClose: () => void;
  movieID?: number;
  ref: any
};

export default function PosterModal({ isOpen, posterPath, onClose, movieID, ref }: Props) {
  return (
    <Modal
      statusBarTranslucent
      visible={isOpen}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
    <Pressable
      style={StyleSheet.absoluteFill} 
      onPress={onClose} 
    />
    <BlurView 
      tint="systemChromeMaterialDark"
      intensity={90}
      blurReductionFactor={20}
      blurMethod="dimezisBlurView"
      blurTarget={ref}
      style={StyleSheet.absoluteFill}
    />
      <View style={styles.background} pointerEvents="box-none">
        <PressableScale
          activeScale={0.95}
          style={styles.closeBtn}
          onPress={onClose}
        >
          <Image
            style={{ height: 26, width: 26, alignSelf:"center" }}
            source={require("@/app/profile/assets/Icon.png")}
          />
        </PressableScale>

        <View style={styles.posterView}>
          <AnimatedFastImage
            sharedTransitionTag={`movie-${movieID}-poster`}
            style={styles.posterImage}
            source={{ uri: `https://image.tmdb.org/t/p/w500${posterPath}`}}
            cachePolicy="disk"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    flexDirection:"column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  posterView: {
    //padding: wp(2),
    marginBottom: hp(8),
    width: wp(60),
    aspectRatio: 0.65,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0.5,
  },
  posterImage: {
    width: "100%",
    height: "100%",
  },
  editBtnView: {
    flexDirection: "row",
    marginTop: 15,
    width: "60%",
    height: 44,
    backgroundColor: "blue",
    borderRadius: 999,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  editBtnImage: {
    height: 30,
    width: 30,
  },
  closeBtn:{
    alignSelf: "flex-end",
    height: 44,
    width: 44,
    marginLeft: 17,
    marginBottom: hp(2),
    borderColor:"rgba(255, 255, 255, 0.2)",
    backgroundColor:"rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
  },
});