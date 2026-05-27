import { View, Text, StyleSheet } from "react-native";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";
import { GlassSurface } from "./GlassSurface";
import { useImage } from "@shopify/react-native-skia";
import { SkiaGlassButton } from "./GlassButton";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

interface Props {
  isLoading: boolean;
  isCurrentUser: boolean;
  isFollowed: boolean;
  onEdit: () => void;
  onToggleFollow: () => void;
  onChat: () => void;
  bgUrl: string;
};

const buttonLayout = { x: widthPercentageToDP(98) - 100, y: heightPercentageToDP(95)-50, width: 100, height: 50 };

export function ActionButton({
  isLoading,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow,
  onChat,
  bgUrl,
}: Props) {

  let text;
  if (isLoading) text = "* * *";
  else if (isCurrentUser) text = "Edit";
  else if (!isCurrentUser) text = isFollowed ? "Unfollow" : "Follow";

  const bgImage = useImage(bgUrl ?? "https://i.pinimg.com/736x/e3/df/44/e3df44a42cd025d4a39d1b674f85080f.jpg");

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {
        (isCurrentUser) ?
          (<PressableScale
            style={styles.transparent}
            onPress={onEdit}
          >
            <Text
              style={textStyle.white18}
            >
              {text}
            </Text>
          </PressableScale >)
          :
          (<PressableScale
            style={isFollowed ? styles.transparent : styles.white}
            onPress={async () => await onToggleFollow()}
          >
            <Text
              style={isFollowed ? textStyle.white18 : textStyle.black18}
            >
              {text}
            </Text>
          </PressableScale>)
      }
      {
        isFollowed ?
          (<SkiaGlassButton
            width={buttonLayout.width}
            height={buttonLayout.height}
            bgOffsetX={buttonLayout.x}
            bgOffsetY={buttonLayout.y}
            backgroundImage={bgImage}
            screenHeight={heightPercentageToDP(40)}
            screenWidth={widthPercentageToDP(100)}
            onPress={()=>{}}
            text="Chat"
          />
          )
          : null
      }
    </View>
  )
};

const styles = StyleSheet.create({
  transparent: {
    gap: 10,
    backgroundColor: "transparent",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "flex-end",
  },
  white: {
    gap: 10,
    backgroundColor: "white",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "white",
    alignSelf: "flex-end",
  },
  chatBtnView: {
    gap: 10,
    backgroundColor: "transparent",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "white",
    alignSelf: "flex-end",
  },
});