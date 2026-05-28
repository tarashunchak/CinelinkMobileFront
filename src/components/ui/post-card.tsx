import React, { memo, useState } from "react";
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

export const PostCard = memo((post) => {
  const [isLiked, setIsLiked] = useState<boolean>(post.isLicked);
  const image = useImage("https://i.pinimg.com/1200x/69/54/ba/6954baf5c7677eee072f361bee8caa18.jpg");
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
            width: Math.min(image?.width || wp(100), wp(100)),
         }}>
        <Image
          source={image}
          style={{flex:1}}
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
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            maxWidth: 100,
            height: 16,
            borderRadius: 10,
          }}>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "white" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
          <View style={{ height: 8, width: 8, borderRadius: 4, backgroundColor: "rgb(100, 100, 100)" }}></View>
        </ScrollView >
      </View>
      <View style={styles.postFooterView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <PressableScale
                activeScale={0.9}
                onPress={() => {
                  setIsLiked(!isLiked);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                }}
              >
                <Heart size={28} strokeWidth={1} color="white" fill={!isLiked ? "red" : "transparent"} />
              </PressableScale>
              <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <Share size={28} strokeWidth={1} color="white" />
              <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
              <MessageCircleMore size={28} strokeWidth={1} color="white" />
              <Text style={[textStyle.white14, { fontWeight: "bold" }]}>10</Text>
            </View>
          </View>
          <Bookmark size={28} strokeWidth={1} color="white" />
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
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf:"center",
    justifyContent:"space-between",
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