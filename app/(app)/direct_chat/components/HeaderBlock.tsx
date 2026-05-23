import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { memo, useCallback, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { calcLastSeen } from "../utils/utils";
import { GetUserLastSeenTimestamp } from "@/api/users";
import { useUserStatus } from "@/app/(app)/rt_client/managers/users_manager";
import { useTypingStatus } from "@/app/(app)/rt_client/managers/chats_manager";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import HeaderContainer from "@/components/ui/header-container";

interface Props {
  chatID: number;
  peerID: number;
  imgUrl: string;
  name: string;
};

export default function Header({ chatID, peerID, imgUrl, name }: Props) {
  const isOnline = useUserStatus(peerID);
  const isTyping = useTypingStatus(chatID, peerID);
  const navigator = useNavigation();
  const [lastSeen, setLastSeen] = useState<string>();

  useEffect(() => {
    async function loadContent() {
      const data = await GetUserLastSeenTimestamp(peerID);
      if (data) setLastSeen(data);
    };
    peerID && loadContent();
    console.warn("Typing: ", isTyping)
  }, [chatID, peerID, isTyping, isOnline]);

  const openProfile = useCallback(()=>{
    navigator.push("UserProfileScreen", {
      userID: peerID,
      avatarUrl: imgUrl,
    });
  }, [chatID]);

  return (
    <HeaderContainer style={styles.view}>
      <View style={{ flexDirection: "row", gap: wp(5), alignItems:"center" }}>
        <ReturnArrowButton />
        <View style={[styles.chatpeer.view]}>
          <TouchableOpacity
            style={styles.chatpeer.img}
            onPress={openProfile}
          >
            <AnimatedFastImage
              sharedTransitionTag={`chat-${chatID}-image`}
              style={stylesR.avatarImg}
              source={{ uri: imgUrl }}
              cachePolicy="disk"
            />
            {isOnline && <View style={styles.isOnline.dot}></View>}
          </TouchableOpacity>

          <View style={styles.chatpeer.text.view}>
            <AnimatedFastText
              style={textStyle.white18}
              sharedTransitionTag={`chat-${chatID}-name`}
            >
              {name}
            </AnimatedFastText>
            {!isOnline ? (
              <Text style={textStyle.gray14}>
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
        <Image source={require("@/app/(app)/direct_chat/assets/dots-vertical.png")} style={{ height: "70%", width: "70%" }} />
      </TouchableOpacity>
      
    </HeaderContainer>
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
    backgroundColor: "rgba(20, 20, 20, 1)",
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    padding: "3%",
    paddingLeft: "2%",
    elevation: 15,
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