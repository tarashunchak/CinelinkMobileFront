import { TouchableOpacity, Image } from "react-native";
import React from "react";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

type Props = {
  isVisible: boolean;
};

export function LogOutButton({ isVisible }: Props) {
  return (
    isVisible ?
      <TouchableOpacity
        onPress={() => useAuthStore.getState().logOut()}
      >
        <Image
          style={{
            height: 34,
            width: 34,
          }}
          source={require("@/app/profile/assets/logOut.png")}
        />
      </TouchableOpacity>
      : <></>
  )
}