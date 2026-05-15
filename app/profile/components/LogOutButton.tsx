import { TouchableOpacity, Image, Alert, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { RTClient } from "@/app/rt_client/rt_client";
import { PressableScale } from "react-native-pressable-scale";

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
      onPress: () => {
        RTClient.setOnlineStatus(useAuthStore.getState()?.user?.user_id, false);
        useAuthStore.getState().logOut();
      }
    }
  ]);
};

export function LogOutButton({ isVisible }: Props) {
  return (
    isVisible &&
      <PressableScale
        style={{zIndex: 2}}
        onPress={showLogOutDialog}
      >
        <Image
          style={styles.img}
          source={require("@/app/profile/assets/logOut.png")}
        />
      </PressableScale>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 34,
    width: 34,
  }
});