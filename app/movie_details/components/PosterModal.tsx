import React from "react";
import { Image, Modal, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import { BlurView } from "expo-blur";

interface Props {
  isOpen: boolean;
  posterUrl: string;
  onClose: () => void;
  movieID?: number;
};

export default function PosterModal(
  { isOpen, posterUrl, onClose, movieID }: Props
) {
  return (
    <Modal
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
      style={{ flex: 1 }}
    >
      <BlurView 
        tint="dark"
        style={styles.background}
      >
        <View style={{}}>
          <PressableScale
            style={{
              alignSelf: "flex-end",
              height: 34,
              width: 34,
              marginLeft: 17,
              marginBottom: hp(2),
            }}
            onPress={() => {
              onClose();
            }}
          >
            <Image
              style={{ height: "100%", width: "100%" }}
              source={require("@/app/profile/assets/Icon.png")}
            />
          </PressableScale>
          <View style={styles.posterView}>
            <AnimatedFastImage
              sharedTransitionTag={`movie-${movieID}-poster`}
              style={styles.posterImage}
              source={{ uri: "https://image.tmdb.org/t/p/w300" + posterUrl }}
              cachePolicy="memory"
            />
          </View>
        </View>
      </BlurView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
});