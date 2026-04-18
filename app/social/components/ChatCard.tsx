import React from "react";
import { textStyle } from "@/styles/textStyles";
import { View, Text, Image } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "expo-router";
import { RTClient } from "@/app/rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";

export default async function ChatCard({ item }: { item: any }) {
  const navigator = useNavigation();

  return (
    <PressableScale
      activeScale={0.98}
      style={styles.card.view}
      onPress={() => {
        navigator?.navigate("DirectChatScreen", { chatID: item?.chat_id });
        RTClient.setChatEntering(item?.chat_id, getCurrentUserID());
      }}
    >
      <View style={styles.card.info.view}>
        <Image
          style={styles.card.info.image}
          source={
            item?.img_url ? { uri: item?.img_url } :
              require("@/assets/images/giggaNigga.png")
          }
        />
        <View style={styles.card.info.text.view}>
          <Text style={styles.card.info.text.name}>{item.name}</Text>
          <Text style={styles.card.info.text.last_message}>{"Go v minecraft"}</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = {
  card: {
    view: {
      flexDirection: "row",
      width: "100%",
      height: hp("8.5%"),
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      borderWidth: 0.5,
      borderRadius: 4,
      justifyContent: "space-between",
      paddingLeft: "3%",
      marginBottom: 5,
    },
    info: {
      view: {
        flexDirection: "row",
        gap: 10,
      },
      image: {
        width: 60,
        height: 60,
        alignSelf: "center",
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 0.5,
        borderRadius: 999,
      },
      text: {
        view: {
          flexDirection: "column",
          justifyContent: "space-evenly",
        },
        name: [textStyle.yellow18, {
        }],
        last_message: [textStyle.gray16, {

        }],
      },
    },
    chatIcon: {
      width: 24,
      height: 24,
      margin: 5,
    }
  }
};
