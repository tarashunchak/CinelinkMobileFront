import React, { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { Pressable, StyleSheet } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { useEditMode } from "../hooks";

export default function MessageContainer({
  style,
  children,
  isEditMode,
  enableEditMode,
  isSelected,
  toggleSelect,
}: any) {

  const { enable, disable, toggle } = useEditMode(3);

  useEffect(() => {
    console.warn("isEditMode: ", isEditMode)
  }, []);

  return (
    <Pressable
      style={isSelected ? picked.mainView : notPicked.mainView}
      onPress={() => {
        if (isEditMode) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
      }}
      onLongPress={() => {
        if (!isEditMode) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          enable();
        }
      }
      }
    >
      <PressableScale
        style={style}

        delayLongPress={350}
      >
        {children}
      </PressableScale>
    </Pressable >
  );
};

const picked = StyleSheet.create({
  mainView: {
    width: wp(100),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "column",
    paddingVertical: "1%",
    marginVertical: "1%",
  }
});

const notPicked = StyleSheet.create({
  mainView: {
    width: wp(100),
    backgroundColor: "transparent",
    flexDirection: "column",
    paddingVertical: "1%",
    marginVertical: "1%",
  },
});