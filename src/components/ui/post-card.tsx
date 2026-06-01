import React, { memo, useCallback, useEffect, useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet, Text, View } from "react-native";
import Spacer from "@/src/components/ui/spacer";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { PressableScale } from "react-native-pressable-scale";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import { textStyle } from "@/styles/textStyles";
import { Bookmark, Heart, MessageCircleMore, Share } from "lucide-react-native";
import { Image, useImage } from "expo-image";
import * as Haptics from "expo-haptics";
import Svg, { Circle } from "react-native-svg";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const BookMarkButton = memo(({ isMarked }: { isMarked: boolean }) => {
  const [isMarkedState, setIsMarkedState] = useState<boolean>(isMarked);
  const handlePress = useCallback(() => {
    setIsMarkedState(!isMarkedState);
  }, [isMarkedState]);
  return (
    <PressableScale onPress={handlePress}>
      <Bookmark size={28} strokeWidth={1} color="white" fill={isMarkedState ? "yellow" : "transparent"} />
    </PressableScale>
  );
});

const LikeButton = memo(({ isLiked }: { isLiked: boolean }) => {
  const [isLikedState, setIsLikedState] = useState<boolean>(isLiked);
  const handlePress = useCallback(() => {
    setIsLikedState(!isLikedState);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }, [isLikedState]);
  return (
    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
      <PressableScale
        activeScale={0.9}
        onPress={handlePress}
      >
        <Heart size={28} strokeWidth={1} color="white" fill={isLikedState ? "red" : "transparent"} />
      </PressableScale>
      <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
    </View>
  );
});

const CommentsButton = memo(({ postID }: { postID: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handlePress = useCallback(() => {
  }, []);
  return (
    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
      <PressableScale
        activeScale={0.9}
        onPress={handlePress}
      >
        <MessageCircleMore size={28} strokeWidth={1} color="white" />
      </PressableScale>
      <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
    </View>
  );
});

const ShareButton = memo(({ postID }: { postID: number }) => {
  const handlePress = useCallback(() => {
  }, []);
  return (
    <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
      <PressableScale
        activeScale={0.9}
        onPress={handlePress}
      >
        <Share size={28} strokeWidth={1} color="white" />
      </PressableScale>
      <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
    </View>
  );
});

const dotsCarousel = StyleSheet.create({
  view: {
    flex: 1,
  },
  svg: {
    position: "absolute",
    alignSelf: "center",
    bottom: 24,
    backgroundColor: "rgba(200, 200, 200, 0.7)",
    maxWidth: 100,
    minWidth: 40,
    height: 16,
    borderRadius: 10,
  },
});

const DotsCarousel = memo(({ activeIndex, total, maxVisible = 7 }: { activeIndex: number, total: number, maxVisible: number }) => {
  const gap = 10;
  const dotSize = 4;
  const activeSize = 6;

  const getTranslateX = () => {
    if (total <= maxVisible) return 0;

    const half = Math.floor(maxVisible / 2);
    const maxOffset = (total - maxVisible) * gap;

    let offset = (activeIndex - half) * gap;
    offset = Math.max(0, Math.min(offset, maxOffset));

    return -offset;
  };
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(getTranslateX(), { duration: 240 });
  }, [activeIndex]);

  const transform = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  const totalWidth = (total - 1) * gap + 20;
  const containerWidth = (maxVisible - 1) * gap + 20;

  return (
    <View style={[{ width: containerWidth, overflow: "hidden", alignItems: "center", height: 20 }, dotsCarousel.svg]}>
      <Animated.View style={[{ flexDirection: "row", gap: 5 }, transform]}>
        {
          Array.from({ length: total }).map((item: any, i: number) => {
            const x = 10 + i * gap;
            const isActive = i === activeIndex;
            return <View
              style={{
                backgroundColor: isActive ? "white" : "#404040",
                height: 8,
                width: 8,
                borderRadius: 4,
              }}
            />
          })
        }
      </Animated.View>
    </View>
  );
});

export const PostCard = memo((post) => {
  const image = useImage("https://i.pinimg.com/736x/8f/29/2e/8f292efe30e60b2401ad562bbe74dbf4.jpg");
  return (
    <View style={styles.postCardView}>
      <View style={styles.postHeaderView}>
        <View style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}>
          <PressableScale>
            <AnimatedFastImage
              source={require("@/assets/images/giggaNigga.png")}
              style={styles.postUserAvatar}
            />
          </PressableScale>
          <View>
            <AnimatedFastText
              style={textStyle.yellow18}
            >
              {"Моцний Хлоп"}
            </AnimatedFastText>
          </View>
        </View>

      </View>
      <View style={{
        height: Math.min(image?.height, 600),
        aspectRatio: image?.height / image?.width,
      }}>
        <Image
          source={image}
          style={{
            height: "100%",
            width: "100%",
          }}
          resizeMode="contain"
        />
        <DotsCarousel maxVisible={7} total={8} activeIndex={0} />
      </View>
      <View style={styles.postFooterView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <LikeButton isLiked={false} />
            <ShareButton postID={post.post_id} />
            <CommentsButton postID={post.post_id} />
          </View>
          <BookMarkButton isMarked={false} />
        </View>
        <Text
          style={[textStyle.gray12, {
            alignSelf: "flex-start",
            fontWeight: "bold",
          }]}
        >{"Wed. 14"}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  postCardView: {
    width: "100%",
    minHeight: 328,
    maxHeight: 728,
    backgroundColor: "#222831",
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 0.3,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postHeaderView: {
    width: "100%",
    height: 56,
    backgroundColor: "#272829",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1%",
    elevation: 10,
    marginBottom: 1,
  },
  postFooterView: {
    width: "100%",
    height: 64,
    backgroundColor: "#272829",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2%",
  },
  postUserAvatar: {
    height: 52,
    width: 52,
    borderRadius: 999,
    borderColor: "white",
    borderWidth: 0.1,
  },
});

/**
 * <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 10,
            gap: 6,
            flexDirection: "row",
            alignItems: "center",
          }}
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 24,
            backgroundColor: "rgba(200, 200, 200, 0.7)",
            maxWidth: 100,
            height: 16,
            borderRadius: 10,
          }}>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "white" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(80, 80, 80)" }}></View>
        </ScrollView >
 */