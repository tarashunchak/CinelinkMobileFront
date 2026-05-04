import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { WatchlistSheetRef } from "./add-to-watchlist-modal/AddToWatchlistModal";

export default function ActionButtonsBlock({ movieID, onPress }: { movieID: number | undefined, onPress: () => void }) {
  return (
    <View style={styles.view}>
      <TouchableOpacity style={[styles.buttonView, styles.markAsWatchedBtn]}
        onPress={onPress}>
        <Text style={styles.buttonText}>Add to Watchlist</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonView, styles.shareBtn]}>
        <Text style={styles.buttonText}>Recommend</Text>
      </TouchableOpacity>
    </View >
  )
}

const styles = {
  view: {
    marginBottom: "5%",
    marginTop: "15%",
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
  buttonText: [
    textStyle.white18,
    {
      width: "100%",
      textAlign: "center"
    }
  ]
};