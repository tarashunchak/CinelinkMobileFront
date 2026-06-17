import React from "react";
import { useNavigation, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { memo } from "react";
import { TouchableOpacity, Dimensions, Image, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenW, height: screenH } = Dimensions.get("window");

function ReturnArrowButton(
  {
    rect = undefined,
    style = {},
  }
) {

  const router = useRouter();

  let buttonStyle = styles.leafyButton;
  const finalStyle = rect
    ? [buttonStyle, {
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: 48,
      height: 48,
    }] : [buttonStyle, style, {zIndex: 2}];

  const images = {
    returnLeft: require('@/assets/images/ReturnArrow.png'),
  };
  return (
    <PressableScale style={finalStyle} onPress={router.back}>
      <ArrowLeft
        size={26}
        strokeWidth={2}
        color="white"
      />
    </PressableScale>
  );
};

export default memo(ReturnArrowButton);

const styles = StyleSheet.create({
  leafyButton: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignItems: "center",
    height: 48,
    width: 48,
    borderRadius: 24,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
});