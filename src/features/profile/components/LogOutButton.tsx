import { Alert, StyleSheet } from "react-native";
import React from "react";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { RTClient } from "@/src/rt_client/rt_client";
import { PressableScale } from "react-native-pressable-scale";
import { LogOut } from "lucide-react-native";

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

export function LogOutButton({isVisible} : Props) {
  if(!isVisible)
    return null;
  return (
    <PressableScale
      style={{zIndex: 2, alignSelf: "flex-end"}}
      onPress={showLogOutDialog}
    >
      <LogOut size={34} strokeWidth={1} color="white" />
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 34,
    width: 34,
  }
});