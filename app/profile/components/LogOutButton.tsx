import { TouchableOpacity, Image, Alert, StyleSheet } from "react-native";
import React from "react";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

type Props = {
  isVisible: boolean;
};

function showLogOutDialog() {
  Alert.alert(
    "Log Out",
    "Are you sure you want to log out?", [
    {
      text: "Cancel",
      onPress: () => { },
      style: "cancel",
    },
    {
      text: "Confirm",
      onPress: () => useAuthStore.getState().logOut()
    }
  ]);
};

export function LogOutButton({ isVisible }: Props) {
  return (
    isVisible ?
      <TouchableOpacity
        onPress={showLogOutDialog}
      >
        <Image
          style={styles.img}
          source={require("@/app/profile/assets/logOut.png")}
        />
      </TouchableOpacity>
      : <></>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 34,
    width: 34,
  }
});