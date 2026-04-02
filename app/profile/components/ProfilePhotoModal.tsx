import { useState } from "react";
import { Image, ImageBackground, Modal, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


export default function ProfilePhotoModal({ isOpen, avatarUrl, onClose }: { isOpen: boolean, avatarUrl: string, onClose: () => void }) {
  return (
    <Modal
      statusBarTranslucent={true}
      visible={isOpen}
      transparent={true}
      animationType="slide"
    >
      <ImageBackground
        style={styles.background}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
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
  avatar: {
    marginTop: hp(30),
    width: wp(50),
    height: wp(50),
    borderRadius: 999,
  }
});