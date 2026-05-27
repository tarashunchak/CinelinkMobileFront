import { Rect, vec, LinearGradient, Blur, Canvas, Group, Image, rect, rrect, RoundedRect } from "@shopify/react-native-skia";
import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

const {width: SCREEN_W, height: SCREEN_H} = Dimensions.get("window");

interface GlassSurfaceProps {
  children: React.ReactNode;
  width: number;
  height: number;
  x: number;
  y: number;
  blur?: number;
  opacity?: number;
  borderRadius?: number;
  backgroundImage: any;
};

export const GlassSurface = ({
  children,
  width,
  height,
  x, y,
  blur = 1,
  opacity = 0.3,
  borderRadius = 12,
  backgroundImage
}: GlassSurfaceProps)=>{

  return (
    <View style={{ width, height, position: 'absolute', left: x, top: y }}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Group clip={{ x: 0, y: 0, width, height, rx: borderRadius }}>
          {/* Заблюрене фонове зображення */}
          {backgroundImage && (
            <Image
              image={backgroundImage}
              x={-x}
              y={-y}
              width={SCREEN_W}
              height={SCREEN_H}
              fit="cover"
            >
              <Blur blur={blur} />
            </Image>
          )}
          
          {/* Оверлей */}
          <RoundedRect
        rect={rrect(rect(
          0, 0,
          width, height
        ), borderRadius, 0)}
          style="stroke"
          strokeWidth={0.5}
          color="rgba(255,255,255,0.3)"
        >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(0, height)}
              colors={[
                `rgba(255,255,255,${opacity * 0.5})`,
                `rgba(255,255,255,${opacity * 0.2})`
              ]}
            />
          </RoundedRect>
        </Group>
        
        {/* Border */}
        <RoundedRect
        rect={rrect(rect(
          0.5, 0.5,
          width-1, height-1
        ), borderRadius, 0)}
          style="stroke"
          strokeWidth={0.5}
          color="rgba(255,255,255,0.3)"
        />
      </Canvas>
      
      {/* Контент поверх Canvas */}
      <View style={StyleSheet.absoluteFill}>
        {children}
      </View>
    </View>
  );
};