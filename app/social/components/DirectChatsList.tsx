import React, { memo, useCallback } from "react";
import { textStyle } from "@/styles/textStyles";
import { FlatList, View, Text, Image, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useNavigation } from "expo-router";
import { RTClient, useChatLastMessage, useUnseenMessageCount, useUserStatus, useUserTypingInChatStatus } from "@/app/rt_client/rt_client";
import { useChatStore } from "@/app/rt_client/chat_state";

const DirectChatCard = memo(({ item }: { item: any }) => {
  const chatID = item?.chat_id;
  const navigator = useNavigation();
  RTClient.createMessageStorage(chatID);
  RTClient.getChatMessages(chatID);
  //RTClient.setChatEntering(chatID, useAuthStore.getState().user?.user_id ?? 1);
  const peerID = item?.peer_id?.["Int32"];
  const isTyping = useUserTypingInChatStatus(peerID, chatID);
  const lastMessage = useChatLastMessage(chatID);
  const isOnline = useUserStatus(peerID);
  const username = useChatStore.getState().users[lastMessage?.user_id]?.username;

  const unSeenMessageCnt = useUnseenMessageCount(chatID);

  return (
    <PressableScale
      activeScale={0.98}
      style={styles.mainView}
      onPress={() => {
        navigator?.navigate("DirectChatScreen", { chatID: chatID });
      }}
    >
      <View style={styles.infoView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={styles.image}
            source={
              item?.img_url ? { uri: item?.img_url } :
                require("@/assets/images/giggaNigga.png")
            }
          />
          {isOnline && <View style={styles.onlineDot}></View>}
        </View>
        <View style={styles.textView}>
          <Text style={textStyle.yellow18}>{item.name}</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[textStyle.gray16, { maxWidth: "100%" }]}
          >{isTyping ? "typing..." : `${username}: ` + lastMessage?.message}</Text>
        </View>
      </View>
      <View style={{
        backgroundColor: "white",
        borderRadius: 999,
        height: 20,
        width: 20,
        alignSelf: "flex-start",
        margin: "2%",
        alignItems: "center",
      }}>
        <Text style={textStyle.black14, { fontWeight: "bold", textAlign: "center" }}>{unSeenMessageCnt}</Text>
      </View>
    </PressableScale>
  );
});

function ChatsList({ chats }: { chats: any[] }) {
  const renderItem = useCallback(({ item }: any) => (
    <DirectChatCard item={item} />
  ), [chats]);

  return (
    <FlatList
      data={chats}
      keyExtractor={(item: any, index: number) => String(item?.user_id ?? index)}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

export default memo(ChatsList)

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    width: "100%",
    height: hp("8.5%"),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 15,
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
    width: "70%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  chatIcon: {
    width: 24,
    height: 24,
    margin: 5,
  },
  onlineDot: {
    height: 12,
    width: 12,
    backgroundColor: "#329E4F",
    borderRadius: 10,
    position: "absolute",
    right: 3,
    bottom: 3,
    borderColor: "white",
    borderWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: "1%",
  },
});
