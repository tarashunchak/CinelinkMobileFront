import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { calcLastSeen } from "../utils";
import { GetUserLastSeenTimestamp } from "@/api/users";
import { useUserStatus } from "@/src/rt_client/managers/users_manager";
import { useTypingStatus } from "@/src/rt_client/managers/chats_manager";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import HeaderContainer from "@/src/components/ui/header-container";
import { EllipsisVertical } from "lucide-react-native";
import { PressableScale } from "react-native-pressable-scale";

interface Props {
  chatID: number;
  peerID: number;
  imgUrl: string;
  name: string;
};

export default function Header({ chatID, peerID, imgUrl, name }: Props) {
  const isOnline = useUserStatus(peerID);
  const isTyping = useTypingStatus(chatID, peerID);
  const router = useRouter();
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
    router.push({
      pathname: "/(app)/profile", 
      params: {
        userID: peerID,
        avatarUrl: imgUrl,
      }
    });
  }, [chatID]);

  return (
    <HeaderContainer style={styles.view}>
      <View style={{ flexDirection: "row", gap: wp(5), alignItems:"center" }}>
        <ReturnArrowButton />
        <View style={[styles.chatpeer.view]}>
          <PressableScale
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
          </PressableScale>

          <View style={styles.chatpeer.text.view}>
            <AnimatedFastText
              style={[textStyle.white20, {fontWeight: "bold"}]}
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
                  <Text style={[styles.isOnline.text, {fontWeight: "bold"}]}>
                    {isTyping ? `is typing ...` : `online`}
                  </Text>
                </View>
              )
            }
          </View>
        </View>

      </View>
      <PressableScale style={stylesR.dots}>
        <EllipsisVertical size={38} strokeWidth={1} color="white" />
      </PressableScale>
      
    </HeaderContainer>
  );
};

const stylesR = StyleSheet.create({
  view: {
  },
  avatarImg: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "#2C394B",
    flexDirection: "row",
    alignItems:"center",
    justifyContent: "space-between",
    padding: "3%",
    paddingLeft: "2%",
    elevation: 15,
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
      height: 54,
      width: 54,
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