import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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

  return (
    <ScrollView
      style={styles.scrollView}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {
        categories?.map((item: string, index: number) =>
        (
          <TouchableOpacity
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
          </TouchableOpacity>
        )
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginTop: hp(1),
    minHeight: hp(5),
    width: "100%",
    padding: 1,
    paddingLeft: hp(1),
    paddingRight: hp(2),
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
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