import React, { useCallback, useEffect, useMemo } from "react";
import { textStyle } from "@/styles/textStyles";
import { Text, View, Modal, StyleSheet, ToastAndroid } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { Skeleton } from "react-native-skeletons";
import { BlurView } from "expo-blur";
import { Pencil, X } from "lucide-react-native";
import { useBlurTargetReady, useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";

interface Props {
  isOpen: boolean;
  avatarUrl: string;
  onClose: () => void;
  isCurrentUser: boolean;
};

export default function ProfilePhotoModal({ isOpen, avatarUrl, onClose, isCurrentUser }: Props) {
  const [avatarUri, setAvatarUri] = useState<string>(avatarUrl)
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [picked, setPicked] = useState<boolean>(false);

  const blurTargetRef = useBlurTargetRef();
  const isBlurTargetReady = useBlurTargetReady();

  return (
    <Modal
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
      style={StyleSheet.absoluteFill}
    >
      {isBlurTargetReady && <BlurView
        intensity={70}
        tint="systemChromeMaterialDark"
        style={StyleSheet.absoluteFill}
        blurTarget={blurTargetRef}
        blurMethod="dimezisBlurView"
        blurReductionFactor={10}
      />}
      <View style={styles.background}>
        <PressableScale
          activeScale={0.95}
          style={styles.closeBtn}
          onPress={onClose}
        >
          <X size={36} strokeWidth={1} color="white" />
        </PressableScale>
        {!isLoaded && <Skeleton style={styles.avatarView} />}
        <View style={[styles.avatarView, { opacity: isLoaded ? 1 : 0 }]}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatarImage}
            cachePolicy="disk"
            onLoadEnd={() => setIsLoaded(true)} />
        </View>
        {
          isCurrentUser &&
          <PressableScale
            style={styles.editBtnView}
            onPress={async () => {
              try {
                const results = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 1,
                });
                if (results?.assets?.[0]?.uri)
                  setAvatarUri(results?.assets?.[0]?.uri ?? "")
              } catch (e) {
              }

              ToastAndroid.showWithGravity("Cannot get image", 1000, 10);
            }}
          >
            <Pencil size={26} strokeWidth={1} color="white" />
            <Text style={[textStyle.white22, { fontWeight: "bold" }]}>Edit</Text>
          </PressableScale>
        }
        {
          isCurrentUser && picked &&
          <PressableScale style={{}}>
            <X size={38} strokeWidth={1} color="white" />
          </PressableScale>
        }
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  background: {
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  avatarView: {
    padding: wp(2),
    width: wp(58),
    aspectRatio: 1,
    borderRadius: 999,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 0.5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
  },
  editBtnView: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    width: 120,
    height: 44,
    paddingHorizontal: 15,
    backgroundColor: "#DEB522",
    borderRadius: 999,
    alignSelf: "center",
    alignItems: "center",
  },
  editBtnImage: {
    height: 30,
    width: 30,
    alignSelf: "center"
  },
  closeBtn: {
    alignSelf: "flex-end",
    height: 44,
    width: 44,
    marginLeft: 17,
    marginBottom: hp(2),
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});