import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { BlurView } from "expo-blur";
import { useBlurTargetReady, useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";

const categories = [
  "All",
  "Users",
  "Movies",
  "Credits",
  "Series",
  "Watchlists",
];

export let getActiveCategory = () => { return "" }

export default function CategoriesBlock({ setCurrent = () => { } }: { setCurrent: (n: string) => void }) {
  const [category, setCategory] = useState<string>("All")
  getActiveCategory = () => category
  const blurTargetRef = useBlurTargetRef();
  const isBlurReady = useBlurTargetReady();

  return (
    <ScrollView
      style={styles.scrollView}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {
        categories?.map((item: string, index: number) =>
        (
          <PressableScale
            key={index}
            style={category == item ? styles.activeView : styles.view}
            onPress={() => {
              setCategory(item);
              setCurrent(item);
            }}
          >
            <Text
              style={[textStyle.white18, styles.text]}
            >
              {item}
            </Text>
          </PressableScale>
        )
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: hp(1),
    minHeight: 40,
    maxHeight: 40,
    width: "100%",
    padding: 1,
    paddingLeft: hp(1),
    paddingRight: hp(2),
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    position:"absolute",
    top: hp(10),
    zIndex: 2,
  },
  view: {
    minWidth: 44,
    height: "100%",
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  activeView: {
    minWidth: 44,
    height: "100%",
    padding: 5,
    backgroundColor: "rgba(225, 180, 0, 0.6)",
    marginRight: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)"
  },
  text: {
    alignSelf: "center",
  }
});