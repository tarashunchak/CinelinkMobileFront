import React, { memo, useCallback, useState } from "react";
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
        <Heart size={28} strokeWidth={1} color="white" fill={!isLikedState ? "red" : "transparent"} />
      </PressableScale>
      <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
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
              {"Gigga Nigga"}
            </AnimatedFastText>
          </View>
        </View>

      </View>
      <View style={{
        height: Math.min(image?.height, 600),
        aspectRatio: image?.height / image?.width,
        paddingVertical: 2,
      }}>
        <Image
          source={image}
          style={{
            height: "100%",
            width: "100%",
          }}
          resizeMode="contain"
        />
        <ScrollView
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
      </View>
      <View style={styles.postFooterView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <LikeButton isLiked={false} />
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <Share size={28} strokeWidth={1} color="white" />
              <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <MessageCircleMore size={28} strokeWidth={1} color="white" />
              <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
            </View>
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
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postHeaderView: {
    width: "100%",
    height: 56,
    backgroundColor: "#31363F",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1%",
    elevation: 10,
  },
  postFooterView: {
    width: "100%",
    height: 64,
    backgroundColor: "#31363F",
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