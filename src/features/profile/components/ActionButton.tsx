import { View, Text, StyleSheet } from "react-native";
import { textStyle } from "@/styles/textStyles";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "expo-router";
import { PressableScale } from "react-native-pressable-scale";
import { GlassSurface } from "./GlassSurface";
import { useImage } from "@shopify/react-native-skia";
import { SkiaGlassButton } from "./GlassButton";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

interface Props {
  isLoading?: boolean;
  isCurrentUser?: boolean;
  isFollowed: boolean;
  onEdit: () => void;
  onToggleFollow: () => void;
  onChat: () => void;
  bgUrl?: string;
};

export function ActionButton({
  isLoading,
  isCurrentUser,
  isFollowed,
  onEdit,
  onToggleFollow,
  onChat,
  bgUrl,
}: Props) {

  const text = useMemo(()=>{
    if (isLoading) return "* * *";
    else if (isCurrentUser || isCurrentUser === undefined) return "Edit";
    else if (isCurrentUser === false) return isFollowed ? "Unfollow" : "Follow";
  }, [isCurrentUser, isFollowed, isLoading ]);

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {
        (isCurrentUser) ?
          (<PressableScale
            style={styles.transparent}
            onPress={onEdit}
          >
            <Text
              style={textStyle.white20}
            >
              {text}
            </Text>
          </PressableScale >)
          :
          (<PressableScale
            style={isFollowed ? styles.transparent : styles.white}
            onPress={onToggleFollow}
          >
            <Text
              style={isFollowed ? textStyle.white20 : textStyle.black20}
            >
              {text}
            </Text>
          </PressableScale>)
      }
      {
        !isCurrentUser?
          (<PressableScale
            style={styles.transparent}
            onPress={onChat}
          >
            <Text
              style={textStyle.white20}
            >
              {"Chat"}
            </Text>
          </PressableScale>
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