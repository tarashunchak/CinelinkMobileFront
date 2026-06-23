import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { Skeleton } from "react-native-skeletons";

function OverviewBlock({ text }: { text: string }) {
  if (!text || text?.length === 0) 
    return (
      <Skeleton style={styles.view}>
        <Text style={textStyle.yellow20}>Overview</Text>
      </Skeleton>
    );
  return (
    <View style={styles.view}>
      <Text style={textStyle.yellow20}>Overview</Text>
      <Text style={[textStyle.white16, styles.text]}>
        {text}
      </Text>
    </View>
  )
};

export default memo(OverviewBlock);

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: 6,
    paddingTop: 0,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    marginTop: "3%",
    flexDirection: "column",
    minHeight: 40,
  },
  text: {
    width: "100%",
    textAlign: "justify",
  },
});