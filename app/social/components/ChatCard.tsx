import React from "react";
import { textStyle } from "@/styles/textStyles";
import { View, Text, Image, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "expo-router";
import { RTClient, useChatLastMessage, useTypingStatus } from "@/app/rt_client/rt_client";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export default function ChatCard({ item }: { item: any }) {
  const navigator = useNavigation();
  RTClient.createMessageStorage(item?.chat_id);
  RTClient.getChatMessages(item?.chat_id);
  RTClient.setChatEntering(item?.chat_id, useAuthStore.getState().user?.user_id ?? 1);

  return (
    <PressableScale
      activeScale={0.98}
      style={styles.view}
      onPress={() => {
        navigator?.navigate("DirectChatScreen", { chatID: item?.chat_id });
      }}
    >
      <View style={styles.infoView}>
        <Image
          style={styles.image}
          source={
            item?.img_url ? { uri: item?.img_url } :
              require("@/assets/images/giggaNigga.png")
          }
        />
        <View style={styles.textView}>
          <Text style={textStyle.yellow18}>{item.name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[textStyle.gray16, { maxWidth: "40%" }]}
          >{useChatLastMessage(item?.chat_id)}</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
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
  infoView: {
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
  textView: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  chatIcon: {
    width: 24,
    height: 24,
    margin: 5,
  }
});
