import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { PressableScale } from "react-native-pressable-scale";

interface Props {
  movieID?: number;
  onAddToWatchlist?: () => void;
  onRecommend?: () => void;
};

export default function ActionButtonsBlock({ movieID, onAddToWatchlist, onRecommend }: Props) {
  return (
    <View style={styles.view}>
      <PressableScale 
        onPress={onAddToWatchlist}
        style={[styles.buttonView, styles.markAsWatchedBtn]}
      >
        <Text style={[textStyle.white18, styles.buttonText]}>
          Add to Watchlist
        </Text>
      </PressableScale>

      <PressableScale 
        onPress={onRecommend}
        style={[styles.buttonView, styles.shareBtn]}
      >
        <Text style={[textStyle.white18, styles.buttonText]}>
          Recommend
        </Text>
      </PressableScale>
    </View >
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: "5%",
    marginTop: "5%",
    flexDirection: "row",
    paddingLeft: 2,
    paddingRight: 2,
    height: 42,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
  },
  buttonView: {
    borderWidth: 0.5,
    height: 36,
    width: "48%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  markAsWatchedBtn: {
    borderColor: "rgba(0, 92, 77, 0.4)",
    backgroundColor: "rgba(0, 92, 77, 0.7)",
  },
  shareBtn: {
    borderColor: "rgba(48, 130, 254, 0.3)",
    backgroundColor: "rgba(48, 130, 254, 1)",
  },
  buttonText: {
    width: "100%",
    textAlign: "center"
  },
});