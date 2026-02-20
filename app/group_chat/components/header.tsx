import { GetChat, GetUserChats } from "@/api/chats/chats";
import LeafyReturnArrowButton from "@/components/ui/leafy-return-arrow-btn";
import { textStyle } from "@/styles/textStyles";
import { getCurrentUserID, isCurrentUser } from "@/utils/utils";
import { useFocusEffect, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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

  const isGroupChat = info?.members.length > 2;
  const notMe = info?.members?.filter((item: any) => getCurrentUserID() != item?.user_id)[0];

  return (
    <View style={styles.view}>
      <View style={{ flexDirection: "row", gap: "5%" }}>
        <LeafyReturnArrowButton
          onPress={
            () => navigator.goBack()
          } />

        <View style={styles.chatInfo.view}>
          <TouchableOpacity
            style={styles.chatInfo.img}
            onPress={() => {
              navigator.push("UserProfileScreen", { userID: notMe?.user_id })
            }}
          >
            <Image style={{ width: 53, height: 53, borderRadius: 999 }}
              source={isGroupChat ?
                { uri: "https://i.pinimg.com/1200x/da/64/c9/da64c942e735c2e5d25b544979e96288.jpg" }
                : { uri: notMe?.avatar_url }} />
            <View style={styles.isOnline.dot}></View>
          </TouchableOpacity>

          <View style={styles.chatInfo.text.view}>
            <Text style={styles.chatInfo.text.name}>{info?.name}</Text>
            {false ? (
              <Text style={styles.chatInfo.text.lastSeen}>{`last seen ${info?.last_seen}`}</Text>
            ) :
              (
                <View style={styles.isOnline.view}>
                  <Text style={styles.isOnline.text}>{`online`}</Text>
                </View>
              )
            }
          </View>
        </View>

      </View>

      <TouchableOpacity style={{ height: 54, width: 54, alignItems: "center", justifyContent: "center" }}>
        <Image source={require("@/app/group_chat/assets/dots-vertical.png")} style={{ height: "70%", width: "70%" }} />
      </TouchableOpacity>

    </View>
  );
};

const styles = {
  isOnline: {
    view: {
      flexDirection: "row",
      gap: 5,
      alignItems: "center"
    },
    dot: {
      height: 12,
      width: 12,
      backgroundColor: "#329E4F",
      borderRadius: 10,
      position: "absolute",
      right: 3,
      bottom: 3,
      borderColor: "white",
      borderWidth: 1,
    },
    text: [textStyle.white14, {
      color: "#329E4F",
    }],
  },
  view: {
    height: hp(12),
    backgroundColor: "rgba(20, 20, 20, 1)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: "2%",
    paddingRight: "3%",
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
      height: 58,
      width: 58,
      borderRadius: 999,
      borderColor: "white",
      borderWidth: 0.5,
      padding: 2,
      alignItems: "center",
      justifyContent: "center",
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