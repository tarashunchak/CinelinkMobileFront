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
import { useEditMode } from "@/app/direct_chat/hooks";

interface Props {
  isOpen: boolean;
  avatarUrl: string;
  onClose: () => void;
  isCurrentUser: boolean;
  ref: any;
};

export default function ProfilePhotoModal({ isOpen, avatarUrl, onClose, isCurrentUser, ref }: Props) {
  const [avatarUri, setAvatarUri] = useState<string>(avatarUrl)
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [picked, setPicked] = useState<boolean>(false);

  return (
    <Modal
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
    >
      <BlurView
        intensity={70}
        tint="systemChromeMaterialDark"
        style={StyleSheet.absoluteFill}
        blurTarget={ref}
        blurMethod="dimezisBlurView"
        blurReductionFactor={10}
      >
        <View style={styles.background}>
          <PressableScale
            activeScale={0.95}
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Image
              style={{ height: 26, width: 26, alignSelf: "center" }}
              source={require("@/app/profile/assets/Icon.png")}
            />
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
                  if(results?.assets?.[0]?.uri)
                    setAvatarUri(results?.assets?.[0]?.uri ?? "")
                } catch (e) {
                }

                  ToastAndroid.showWithGravity("Cannot get image", 1000, 10);
              }}
            >
              <Image
                style={styles.editBtnImage}
                source={require("@/app/profile/assets/EditIcon.png")}
              />
              <Text style={[textStyle.white20, {fontWeight: "bold"}]}>Edit</Text>
            </PressableScale>
          }
          {
            isCurrentUser && picked &&
            <PressableScale style={{}}>

            </PressableScale>
          }
        </View>
      </BlurView>
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
  },
});