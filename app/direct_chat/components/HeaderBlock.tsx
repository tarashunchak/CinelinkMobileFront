import { RTClient, useUserStatus, useUserTypingInChatStatus } from "@/app/rt_client/rt_client";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ChatMember } from "@/app/rt_client/models/models";
import { calcLastSeen } from "../utils/utils";
import { GetUserLastSeenTimestamp } from "@/api/users";

export default function Header({ chatID, peer }: { chatID: number, peer: ChatMember }) {
  const navigator = useNavigation();
  const [lastSeen, setLastSeen] = useState<string>();

  const isTyping = useUserTypingInChatStatus(peer?.user_id, chatID);
  const isOnline = useUserStatus(peer?.user_id);

  useEffect(() => {
    async function loadContent() {
      const data = await GetUserLastSeenTimestamp(peer?.user_id);
      if (data) setLastSeen(data);
    };
    loadContent();
  }, [chatID, isOnline]);

  return (
    <View style={styles.view}>
      <View style={{ flexDirection: "row", gap: wp(5) }}>
        <ReturnArrowButton
          onPress={navigator.goBack} />

        <View style={styles.chatpeer.view}>
          <TouchableOpacity
            style={styles.chatpeer.img}
            onPress={() => {
              navigator.push("UserProfileScreen", {
                userID: peer?.user_id,
              });
            }}
          >
            <Image
              style={stylesR.avatarImg}
              source={{ uri: peer?.avatar_url }}
            />
            {isOnline && <View style={styles.isOnline.dot}></View>}
          </TouchableOpacity>

          <View style={styles.chatpeer.text.view}>
            <Text style={styles.chatpeer.text.name}>
              {peer?.username}
            </Text>
            {!isOnline ? (
              <Text style={styles.chatpeer.text.lastSeen}>
                {`last seen ${calcLastSeen(lastSeen)}`}
              </Text>
            ) :
              (
                <View style={styles.isOnline.view}>
                  <Text style={styles.isOnline.text}>
                    {isTyping ? `is typing ...` : `online`}
                  </Text>
                </View>
              )
            }
          </View>
        </View>

      </View>

      <TouchableOpacity style={stylesR.dots}>
        <Image source={require("@/app/direct_chat/assets/dots-vertical.png")} style={{ height: "70%", width: "70%" }} />
      </TouchableOpacity>

    </View>
  );
};

const stylesR = StyleSheet.create({
  view: {

  },
  avatarImg: {
    width: 53,
    height: 53,
    borderRadius: 999
  },
  dots: {
    height: 54,
    width: 54,
    alignItems: "center",
    justifyContent: "center"
  }
});

const styles = {
  isOnline: {
    view: {
      flexDirection: "row",
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
    height: Platform.OS === "ios" ? hp(10) : hp(12),
    backgroundColor: "rgba(20, 20, 20, 1)",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: "2%",
    paddingRight: "3%",
    paddingBottom: "3%",
    zIndex: 2,
  },
  chatpeer: {
    view: {
      flexDirection: "row",
      height: "100%",
      gap: wp(3),
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