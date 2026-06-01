import React, { memo, useMemo } from "react";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { StyleSheet, View } from "react-native";
import { LogOutButton } from "./LogOutButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import HeaderContainer from "@/src/components/ui/header-container";
import { vec, Rect, LinearGradient, Mask, Image, Blur, Canvas, useImage } from "@shopify/react-native-skia";
import { SkiaGlassButton } from "./GlassButton";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

interface Props {
  bgUrl?: string;
  isCurrentUser: boolean;
  isFromTab: boolean,
};

const buttonLayout = { x: (widthPercentageToDP(98)) - 100, y: -((heightPercentageToDP(95) * 0.1) + 50), width: 100, height: 50 };

const SkiaBackground = memo(({ bgUrl }: { bgUrl: string }) => {
  const image = useImage(bgUrl);
  const maskElement = useMemo(() => (
    <Rect x={0} y={0} width={wp(100)} height={hp(45)}>
      <LinearGradient
        start={vec(0, 0)}
        end={vec(0, hp(45))}
        colors={["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 0.4)", "transparent"]}
        positions={[0.35, 0.55, 1]}
      />
    </Rect>
  ), []);

  const darkLayerMask = useMemo(() => (
    <Rect x={0} y={0} width={wp(100)} height={hp(45)}>
      <LinearGradient
        start={vec(0, 0)}
        end={vec(0, hp(45))}
        colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.15)", "transparent"]}
        positions={[0.35, 0.55, 1]}
      />
    </Rect>
  ), []);
  return (
    <Canvas style={styles.bgImage}>
      <Mask mode="alpha" mask={maskElement}>
        {image && <Image
          image={image}
          x={0}
          y={0}
          width={wp(100)}
          height={hp(45)}
          fit="cover"
        >
          <Blur blur={2} />
        </Image>
        }
      </Mask>
      <Mask mode="alpha" mask={darkLayerMask} >
        <Rect
          x={0}
          y={0}
          width={wp(100)}
          height={hp(45)}
          color={"rgba(0, 0, 0, 0.25"}
        />
      </Mask>
    </Canvas>)
});

export default function ProfileHeader({ bgUrl, isCurrentUser, isFromTab }: Props) {
  return (
    <>
      <SkiaBackground bgUrl={bgUrl} />
      <HeaderContainer style={{ backgroundColor: "transparent", paddingHorizontal: wp(1) }}>
        {!isFromTab && <ReturnArrowButton />}
        <LogOutButton isVisible={isCurrentUser} />
      </HeaderContainer>
    </>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    backgroundColor: "transparent",
    height: hp(45),
    width: wp(100),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  }
});

/*
  <Canvas style={{ width: wp(100), height: hp(42), backgroundColor: "transparent" }}>
          <Mask
            mode="alpha"
            mask={
              <Rect x={0} y={0} width={wp(100)} height={hp(42)}>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(0, hp(42))}
                  colors={["white", "#808080", "#333333", "transparent"]}
                  positions={[0.2, 0.3, 0.50, 0.80]}
                />
              </Rect>
            }
          >
            <Image
              image={image}
              x={0}
              y={0}
              width={wp(100)}
              height={hp(42)}
              fit="cover"
            />
          </Mask>
        </Canvas>
 */