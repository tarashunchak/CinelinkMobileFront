import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { BlurView } from "expo-blur";
import { X } from "lucide-react-native";
import { useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";

interface Props {
  isOpen: boolean;
  profilePath: string;
  onClose: () => void;
  creditID?: number;
  ref: any
};

export default function ProfileModal( props : Props) {
  const { isOpen, profilePath, onClose, creditID } = props;
  //console.warn("Props: ", props);
  const blurTargetRef = useBlurTargetRef();
  return (
    <Modal
      statusBarTranslucent
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
    <Pressable
      style={StyleSheet.absoluteFill} 
      onPress={onClose} 
    />
    <BlurView 
      tint="systemChromeMaterialDark"
      intensity={40}
      blurMethod="dimezisBlurView"
      blurTarget={blurTargetRef}
      style={StyleSheet.absoluteFill}
    />
      <View style={styles.background} pointerEvents="box-none">
        <PressableScale
          activeScale={0.95}
          style={styles.closeBtn}
          onPress={onClose}
        >
          <X size={38} strokeWidth={1} color="white" />
        </PressableScale>

        <View style={styles.profileView}>
          <AnimatedFastImage
            sharedTransitionTag={`credit-${creditID}-profile`}
            style={styles.profileImage}
            source={{ uri: `https://image.tmdb.org/t/p/w500${profilePath}`}}
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
  profileView: {
    //padding: wp(2),
    marginBottom: hp(8),
    width: wp(60),
    aspectRatio: 0.65,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderWidth: 0.5,
  },
  profileImage: {
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
    alignItems: "center",
  },
});