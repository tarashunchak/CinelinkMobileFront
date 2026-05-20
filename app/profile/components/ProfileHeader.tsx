import React, { useRef } from "react";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { StyleSheet, View } from "react-native";
import { LogOutButton } from "./LogOutButton";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import HeaderContainer from "@/components/ui/header-container";
import { BlurTargetView, BlurView } from "expo-blur";
import AnimatedFastImage from "@/components/ui/animated-fast-image";

interface Props {
  bgUrl?: string;
  onBack: () => void;
  isCurrentUser: boolean;
};

export default function ProfileHeader({ bgUrl, onBack, isCurrentUser }: Props) {
  const ref = useRef<View | null>(null);
  //const image = useImage(bgUrl);

  return (
    <HeaderContainer style={{ backgroundColor: "transparent" }}>
      <BlurTargetView
        style={styles.bgImage}
        ref={ref}
      >
        <AnimatedFastImage
          source={{ uri: bgUrl }}
          cachePolicy="disk"
          style={styles.bgImage}
        />  
      </BlurTargetView>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: "2%", paddingHorizontal: "1%" }}>
        <ReturnArrowButton />
        <LogOutButton isVisible={isCurrentUser} />
      </View>
      <BlurView
        tint="dark"
        intensity={10}
        style={styles.bgImage}
        blurReductionFactor={30}
        blurMethod="dimezisBlurView"
        blurTarget={ref}
      />
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    backgroundColor: "transparent",
    height: hp("35%"),
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