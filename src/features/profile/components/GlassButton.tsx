import React from "react";
import { useFont, Image, Blur, Rect, LinearGradient, vec, Canvas, RoundedRect, rrect, rect, Fill, BackdropBlur, Group } from "@shopify/react-native-skia";
import { useState } from "react";
import { Text, Pressable, StyleSheet, View } from "react-native";
import { GlassSurface } from "./GlassSurface";
import { PressableScale } from "react-native-pressable-scale";
import { textStyle } from "@/styles/textStyles";

interface GlassButtonProps {
  text: string;
  onPress: () => void;
  width?: number;
  height?: number;
  bgOffsetX?: number;
  bgOffsetY?: number;
  screenWidth: number;
  screenHeight: number;
  backgroundImage: any;
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
  backgroundImage,
}: GlassButtonProps) => {
  //const font = useFont(require("@"))
  const [layout, setLayout] = useState({ x: 0, y: 0 });


  return (
    <PressableScale style={{ justifyContent: "center", alignSelf: "flex-end" }}>
      <Canvas style={{ width, height, overflow: "hidden" }} >
        <RoundedRect rect={rrect(rect(0, 0, width, height), 22, 22)} >
          <Group clip={rrect(rect(0, 0, width, height), 22, 22)}>
            <Image
              image={backgroundImage}
              x={-layout.x - bgOffsetX}
              y={-layout.y - bgOffsetY}
              width={100}
              height={50}
              fit="cover"
            >
            <Blur blur={8} />
              </Image>
          </Group>
 <LinearGradient
            start={vec(0, 0)}
            end={vec(width * 0.3, height * 0.6)}
            colors={["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.02)"]}
          />         
        </RoundedRect>
        <RoundedRect rect={rrect(rect(0.5, 0.5, width - 1, height - 1), 22, 22)} style="stroke" strokeWidth={0.5}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width * 0.3, height * 0.6)}
            colors={["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.01)"]}
          />
        </RoundedRect>
        <RoundedRect rect={rrect(rect(0.5, 0.5, width - 1, height - 1), 22, 22)} style="fill">
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width * 0.8, height * 0.8)}
            colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.5)"]}
          />
        </RoundedRect>
      </Canvas >
      <Text style={[textStyle.white22, { position: "absolute", alignSelf: "center" }]}>
        {text}
      </Text>
    </PressableScale>
  );
};