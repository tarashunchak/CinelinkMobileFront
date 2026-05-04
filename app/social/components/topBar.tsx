import React, { useState } from "react";
import { View, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";

export let getActiveTab = () => { };

export default function SocialPageTopBar({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState("Friends");

  return (
    <View style={styles.mainContainer}>
      {
        tabs.map(tab => (
          <PressableScale
            key={tab}
            onPress={
              () => {
                setActiveTab(tab);
                onTabChange(tab);
              }
            }
            style={[
              styles.buttonView,
              activeTab === tab && styles.activeButtonView
            ]}
          >
            <Text style={textStyle.white18}>{tab}</Text>
          </PressableScale>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 52,
    marginBottom: "5%",
    width: "100%",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5%",
  },
  buttonView: {
    paddingLeft: "2%",
    paddingRight: "2%",
    height: "98%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeButtonView: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    borderWidth: 0.5,
  },
});