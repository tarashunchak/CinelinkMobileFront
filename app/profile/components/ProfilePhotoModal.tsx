import { textStyle } from "@/styles/textStyles";
import { Text, View, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function ProfilePhotoModal(
  { isOpen, avatarUrl, onClose }:
    {
      isOpen: boolean,
      avatarUrl: string,
      onClose: () => void
    }
) {

  const [avatarUri, setAvatarUri] = useState<string>(avatarUrl)

  return (
    <Modal
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
    >
      <ImageBackground
        style={styles.background}>
        <View style={{}}>
          <TouchableOpacity
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
          </TouchableOpacity>
          <View style={styles.avatarView}>
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatarImage}
            />
          </View>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </ImageBackground>
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
  },
  editBtnImage: {
    height: 30,
    width: 30,
  },
});