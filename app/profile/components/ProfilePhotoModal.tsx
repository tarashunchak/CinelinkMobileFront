import React, { useMemo } from "react";
import { textStyle } from "@/styles/textStyles";
import { Text, View, Modal, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { PressableScale } from "react-native-pressable-scale";
import { Image } from "expo-image";
import { Skeleton } from "react-native-skeletons";
import {BlurView} from "expo-blur";

interface Props {
  isOpen: boolean;
  avatarUrl: string;
  onClose: () => void;
  isCurrentUser: boolean;
};

export default function ProfilePhotoModal({ isOpen, avatarUrl, onClose, isCurrentUser, ref }: Props) {
  const [avatarUri, setAvatarUri] = useState<string>(avatarUrl)
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const avatar = useMemo(() => {
    if (isLoaded)
      return (
        <View style={styles.avatarView}>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatarImage}
            cachePolicy="memory-disk"
            onLoadEnd={() => setIsLoaded(true)} />
        </View>
      );

    return <Skeleton style={styles.avatarView} />;
  }, [isLoaded])

  return (
    <Modal 
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
    >
      <BlurView
        intensity={80}
        tint="systemChromeMaterialDark"
        style={styles.background}
        blurTarget={ref}
        blurMethod="dimezisBlurView"
        blurReductionFactor={10}
      >
        <View style={{}}>
          <PressableScale
            style={{
              alignSelf: "flex-end",
              height: 40,
              width: 40,
              marginBottom: hp(2)
            }}
            onPress={() => {
              setAvatarUri(avatarUrl);
              onClose();
            }}
          >
            <Image style={{ height: "100%", width: "100%" }} source={require("@/app/profile/assets/Icon.png")} />
          </PressableScale>
          {avatar}
          {
            isCurrentUser &&
            <PressableScale
              style={styles.editBtnView}
              onPress={async () => {
                const results = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  quality: 1,
                });
                setAvatarUri(results?.assets[0].uri)
              }}
            >
              <Image
                style={styles.editBtnImage}
                source={require("@/app/profile/assets/EditIcon.png")}
              />
              <Text style={textStyle.white20}>Edit</Text>
            </PressableScale>
          }
        </View>
      </BlurView>
    </Modal>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  avatarView: {
    padding: wp(2),
    width: wp(54),
    height: wp(54),
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
    marginTop: 15,
    width: "60%",
    height: 44,
    backgroundColor: "blue",
    borderRadius: 999,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  editBtnImage: {
    height: 30,
    width: 30,
  },
});