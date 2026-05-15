import { useNavigation } from "expo-router";
import { memo } from "react";
import { TouchableOpacity, Dimensions, Image, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenW, height: screenH } = Dimensions.get("window");

function ReturnArrowButton(
  {
    onPress = () => { },
    rect = undefined,
    style = {},
  }
) {

  const navigator = useNavigation();
  const insets = useSafeAreaInsets();

  let buttonStyle = styles.leafyButton;

  if (rect && rect.w && typeof rect.w == "string" && rect.w.includes("%")) {
    rect.w = parseFloat(rect.w) * (screenW / 100.0);
  }
  if (rect && rect.h && typeof rect.h == "string" && rect.h.includes("%")) {
    rect.h = parseFloat(rect.h) * (screenH / 100.0);
  }

  if (rect && rect.y && typeof rect.y == "string" && rect.y.includes("%")) {
    rect.y = parseFloat(rect.y) * (screenH / 100.0);
  }
  if (rect && rect.x && typeof rect.x == "string" && rect.x.includes("%")) {
    rect.x = parseFloat(rect.x) * (screenW / 100.0);
  }

  let transform = [];
  if (rect && rect.x === "centered" && rect.w) {
    rect.x = "50%";
    transform.push({ translateX: -(rect.w / 2) });
  }
  if (rect && rect.y === "centered" && rect.h) {
    rect.y = "50%";
    transform.push({ translateY: -(rect.h / 2) });
  }

  const finalStyle = rect
    ? [buttonStyle, {
      position: "absolute",
      left: rect.x,
      top: rect.y,
      width: 48,
      height: 48,
      transform
    }] : [buttonStyle, style, {zIndex: 2}];

  const images = {
    returnLeft: require('@/assets/images/ReturnArrow.png'),
  };
  return (
    <PressableScale style={finalStyle} onPress={navigator.goBack}>
      <Image source={images["returnLeft"]} ></Image>
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