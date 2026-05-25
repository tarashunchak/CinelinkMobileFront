import React, { memo, useState } from "react";
import { View, Text } from "react-native";
import { textStyle } from "@/styles/textStyles";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderContainer from "@/src/components/ui/header-container";

export let getActiveTab = () => { };

function SocialPageTopBar({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const tabs = ["Chats", "Recommendations", "Activity", "Friends"];
  const [activeTab, setActiveTab] = useState("Chats");
  const insets = useSafeAreaInsets();

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

export default memo(SocialPageTopBar);

const styles = StyleSheet.create({
  mainContainer: {
    height: 52,
    width: "100%",
    alignSelf: "center",
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5%",
    backgroundColor: "rgba(20, 20, 20, 0.3)",
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