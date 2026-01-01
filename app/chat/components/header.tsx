import { GetChat, GetUserChats } from "@/api/chats/chats";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { textStyle } from "@/styles/textStyles";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useSafeAreaFrame } from "react-native-safe-area-context";

export type Chat = {
  chat_id: number;
  name: string;
  img_url: string;
  last_seen: string;
  members: any;
}

const defaultChat: Chat = {
  chat_id: 0,
  name: "name",
  img_url: "",
  members: null,
  last_seen: "",
};

export default function Header({ info }: { info: any }) {

  const navigator = useNavigation();

  return (
    <View style={styles.view}>
      <View style={{ flexDirection: "row", gap: "10%" }}>
        <LeafyReturnArrowButton
          onPress={
            () => navigator.goBack()
          } />

        <View style={styles.chatInfo.view}>
          <TouchableOpacity>
            <Image style={styles.chatInfo.img} source={{ uri: "https://i.pinimg.com/1200x/da/64/c9/da64c942e735c2e5d25b544979e96288.jpg" }} />
          </TouchableOpacity>

          <View style={styles.chatInfo.text.view}>
            <Text style={styles.chatInfo.text.name}>{info?.name}</Text>
            <Text style={styles.chatInfo.text.lastSeen}>{`last seen ${info?.last_seen}`}</Text>
          </View>
        </View>

      </View>

      <TouchableOpacity style={{ height: 54, width: 54, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("@/app/chat/assets/dots-vertical.png")} style={{ height: "70%", width: "70%" }} />
      </TouchableOpacity>

    </View>
  );
};

const styles = {
  view: {
    height: hp(10),
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: "2%",
    paddingRight: "5%",
    paddingBottom: "2%",
    zIndex: 2,
  },
  chatInfo: {
    view: {
      flexDirection: "row",
      height: "100%",
      gap: "6%",
      alignItems: "center",
    },
    img: {
      backgroundColor: "white",
      height: 54,
      width: 54,
      borderRadius: 999,
    },
    text: {
      view: {
        flexDirection: "column",
        height: hp(10) * 0.6,
        justifyContent: "space-between",
      },
      name: [textStyle.white18, {

      }],
      lastSeen: [textStyle.gray14, {

      }],
    }
  }
};