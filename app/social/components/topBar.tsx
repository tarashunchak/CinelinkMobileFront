import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { textStyle } from "@/styles/textStyles";

export let getActiveTab = () => { };

export default function SocialPageTopBar() {
  const tabs = ["Friends", "Recommendations", "Activity", "Chats"];
  const [activeTab, setActiveTab] = useState("Friends");

  getActiveTab = () => activeTab;

  return (
    <View style={styles.topBar.view}>
      {
        tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.topBar.buttons.view,
              activeTab === tab && styles.topBar.activeButton.view
            ]}
          >
            <Text style={textStyle.white18}>{tab}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};

const styles = {
  topBar: {
    view: {
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
    buttons: {
      view: {
        paddingLeft: "2%",
        paddingRight: "2%",
        height: "98%",
        alignItems: "center",
        justifyContent: "center",
      },
      text: {
        color: "white",
        fontSize: 18,
      }
    },
    activeButton: {
      view: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 4,
        borderWidth: 0.5,

      }
    },
  }
}