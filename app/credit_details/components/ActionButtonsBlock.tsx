import { textStyle } from "@/styles/textStyles";
import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";

function ActionButtonsBlock() {
  return (
    <View style={styles.mainView}>
      <PressableScale style={styles.subscribeBtn}>
        <Text style={textStyle.white18}>Subscribe</Text>
      </PressableScale>

      <PressableScale style={styles.favouriteBtn}>
        <Text style={textStyle.white18}>Mark as Favourite</Text>
      </PressableScale>

      <PressableScale style={styles.shareBtn}>
        <Text style={textStyle.white18}>Share</Text>
      </PressableScale>
    </View>
  );
};

export default memo(ActionButtonsBlock);

const styles = StyleSheet.create({
  mainView: {
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
  subscribeBtn: {
    borderRadius: 10,
    borderColor: "rgba(254, 211, 48, 0.3)",
    backgroundColor: "#deb522",
    borderWidth: 0.5,
    height: 36,
    width: 88,
    alignItems: "center",
    justifyContent: "center",
  },
  favouriteBtn: {
    borderColor: "rgba(0, 92, 77, 0.4)",
    backgroundColor: "rgba(0, 92, 77, 0.7)",
    borderWidth: 0.5,
    height: 36,
    width: 148,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  shareBtn: {
    borderColor: "rgba(48, 130, 254, 0.3)",
    backgroundColor: "rgba(48, 130, 254, 1)",
    borderWidth: 0.5,
    height: 36,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});