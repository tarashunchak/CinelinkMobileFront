import React from "react";
import { useImage, useFont, Image, Blur, Rect, LinearGradient, vec, Canvas, RoundedRect, rrect, rect, Fill, BackdropBlur, Group } from "@shopify/react-native-skia";
import { useState } from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { GlassSurface } from "./GlassSurface";
import { PressableScale } from "react-native-pressable-scale";
import { textStyle } from "@/styles/textStyles";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

interface GlassButtonProps {
  text: string;
  onPress: () => void;
  width?: number;
  height?: number;
  bgOffsetX?: number;
  bgOffsetY?: number;
  screenWidth: number;
  screenHeight: number;
  bgUrl: string;
};

export const SkiaGlassButton = ({
  text,
  onPress,
  width,
  height,
  bgOffsetX,
  bgOffsetY,
  screenWidth,
  screenHeight,
  bgUrl,
}: GlassButtonProps) => {
  //const font = useFont(require("@"))
  const [layout, setLayout] = useState({ x: 100, y: 200 });

  const bgImage = useImage(bgUrl);
  console.warn("IMAGE: ", bgImage)

  return (
    <PressableScale style={{ width, height, justifyContent: "center", alignSelf: "flex-end" }}>
      <Canvas style={{ width, height, overflow: "hidden" }} >
        <Group clip={rrect(rect(0, 0, width, height), 22, 22)}>
          <Image
            image={bgImage}
            x={bgOffsetX}
            y={bgOffsetY}
            width={widthPercentageToDP(100)}
            height={heightPercentageToDP(40)}
            fit="contain"
          >
            <Blur blur={3} />
          </Image>
        </Group>
      <RoundedRect rect={rrect(rect(0.5, 0.5, width - 1, height - 1), 22, 22)} style="stroke" strokeWidth={0.5}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width * 0.8, height * 0.6)}
          colors={["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.01)"]}
        />
      </RoundedRect>
          
      </Canvas >
      <Text style={[textStyle.white22, { position: "absolute", alignSelf: "center" }]}>
        {text}
      </Text>
    </PressableScale>
  );
};