import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AddWatchlistItem } from "@/api/watchlist/watchlist";
import { getCurrentUserID } from "@/utils/utils";
import { textStyle } from "@/styles/textStyles";
import { WatchlistItem_T } from "@/api/watchlist/types";
import { buttonStyle } from "@/styles/buttonStyle";

export default function ActionButtonsBlock({ movieID, onActionButton }: { movieID: number | undefined, onActionButton: () => void }) {
  return (
    <View style={styles.view}>
      <TouchableOpacity style={[styles.buttonView, styles.markAsWatchedBtn]}
        onPress={() => {
          onActionButton();
          /*const item: WatchlistItem_T = {
            id: 0,
            movie_id: movieID,
            user_id: getCurrentUserID() || 0,
            watchlist_id: 0,
          };
          AddWatchlistItem(item);*/
        }}>
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