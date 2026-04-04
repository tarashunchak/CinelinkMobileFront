import { textStyle } from "@/styles/textStyles";
import { Text, View, Image, ImageBackground, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function ProfilePhotoModal(
  { isOpen, avatarUrl, onClose }:
    {
      isOpen: boolean,
      avatarUrl: string,
      onClose: () => void
    }
) {
  return (
    <Modal
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
    >
      <ImageBackground
        style={styles.background}>
        <TouchableOpacity
          onPress={onClose}
        >
          <Image source={require("@/app/profile/assets/Icon.png")} />
        </TouchableOpacity>
        <View style={styles.avatarView}>
          <Image
            source={{ uri: avatarUrl }}
            style={styles.avatarImage}
          />
        </View>
        <TouchableOpacity style={styles.editBtnView}>
          <Image
            style={styles.editBtnImage}
            source={require("@/app/profile/assets/EditIcon.png")}
          />
          <Text style={textStyle.white20}>Edit</Text>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  avatarView: {
    padding: wp(2),
    marginTop: hp(30),
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
    width: "40%",
    height: 44,
    backgroundColor: "blue",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtnImage: {
    height: 30,
    width: 30,
  },
});