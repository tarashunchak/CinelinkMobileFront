import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ChatMember } from "@/app/rt_client/models/models";
import { calcLastSeen } from "../utils/utils";
import { GetUserLastSeenTimestamp } from "@/api/users";
import { useChat, useTypingStatus } from "@/app/rt_client/managers/chats_manager";
import { useUserStatus } from "@/app/rt_client/managers/users_manager";
import AnimatedFastImage from "@/components/ui/animated-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedFastText from "@/components/ui/animated-fast-text";
import HeaderContainer from "@/components/ui/header-container";

interface Props {
  chatID: number;
  peer: any;
  imgUrl: string;
  name: string;
};

function Header({ chatID, peer, imgUrl, name }: Props) {
  const navigator = useNavigation();
  const [lastSeen, setLastSeen] = useState<string>();
  const chat = useChat(chatID);

  const insets = useSafeAreaInsets();

  const isOnline = useUserStatus(peer?.user_id);
  const isTyping = useTypingStatus(chatID, peer?.user_id);

  useEffect(() => {
    async function loadContent() {
      const data = await GetUserLastSeenTimestamp(peer?.user_id);
      //if (data) setLastSeen(data);
    };
    loadContent();
  }, [chatID, isOnline]);

  return (
    <HeaderContainer style={styles.view}>
      <View style={{ flexDirection: "row", gap: wp(5) }}>
        <ReturnArrowButton />
        <View style={[styles.chatpeer.view]}>
          <TouchableOpacity
            style={styles.chatpeer.img}
            onPress={() => {
              navigator.push("UserProfileScreen", {
                userID: peer?.user_id,
              });
            }}
          >
            <AnimatedFastImage
              sharedTransitionTag={`chat-${chat?.chat_id}-image`}
              style={stylesR.avatarImg}
              source={{ uri: imgUrl }}
              cachePolicy="disk"
            />
            {isOnline && <View style={styles.isOnline.dot}></View>}
          </TouchableOpacity>

          <View style={styles.chatpeer.text.view}>
            <AnimatedFastText
              style={textStyle.white18}
              sharedTransitionTag={`chat-${chat?.chat_id}-name`}
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
        <Image source={require("@/app/direct_chat/assets/dots-vertical.png")} style={{ height: "70%", width: "70%" }} />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default memo(Header);

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
    alignItems: "flex-end",
    justifyContent: "space-between",
    padding: "3%",
    paddingLeft: "2%",
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