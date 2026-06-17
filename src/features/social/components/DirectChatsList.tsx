import React, { memo, useCallback, useEffect } from "react";
import { textStyle } from "@/styles/textStyles";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useLastChatMessage, useUnseenMessagesCount, useTypingStatus, useUserChats, Chat_T, ChatsManager } from "@/src/rt_client/managers/chats_manager";
import AnimatedFastImage from "@/src/components/ui/animated-fast-image";
import { useUserStatus } from "@/src/rt_client/managers/users_manager";
import AnimatedFastText from "@/src/components/ui/animated-fast-text";
import Spacer from "@/src/components/ui/spacer";
import { getCurrentUserID } from "@/utils/utils";

const EMPTY_CHATS_LIST = Array.from({length: 10});

const DirectChatCard = memo(({ item, onPress }: { item: any, onPress: any}) => {
  const chatID = item?.chat_id;
  const peerID = item?.peer_id?.["Int32"];
  const isTyping = useTypingStatus(chatID, peerID);
  const lastMessage = useLastChatMessage(chatID);
  const isOnline = useUserStatus(peerID);

  const unSeenMessageCnt = useUnseenMessagesCount(chatID);
  
  return (
    <PressableScale
      activeScale={0.98}
      style={styles.mainView}
      onPress={()=>onPress({
        chatID,
        imgUrl: item.img_url,
        name: item.name,
        peerID
      })}
    >
      <View style={styles.infoView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AnimatedFastImage
            sharedTransitionTag={`chat-${item?.chat_id}-image`}
            style={styles.image}
            source={{ uri: item?.img_url }}
            cachePolicy="disk"
          />
          {isOnline && <View style={styles.onlineDot}/>}
        </View>
        <View style={styles.textView}>
          <AnimatedFastText
            style={textStyle.yellow18}
            sharedTransitionTag={`chat-${item?.chat_id}-name`}
          >
            {item.name}
          </AnimatedFastText>
          <AnimatedFastText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[textStyle.gray16, { maxWidth: "100%" }]}
          >
            {isTyping ? "typing..." : lastMessage.text}
          </AnimatedFastText>
        </View>
      </View>
      <View style={{
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 5,
      }}>
        {
          unSeenMessageCnt && 
            <Text style={[textStyle.black14, { fontWeight: "bold", textAlign: "center" }]}>{unSeenMessageCnt}</Text>
        }
        <Text style={textStyle.white14}>{lastMessage.time}</Text>
      </View>
    </PressableScale>
  );
});

export default function ChatsList() {
  const chats: Chat_T[] = useUserChats();
  const router = useRouter();

  const handlePress = useCallback((item: any) => {
    router.navigate({
      pathname: "/direct_chat",
      params: item,
    });
  }, []);

  const renderItem = useCallback(({ item }: {item: Chat_T}) => (
    <DirectChatCard item={item} onPress={handlePress}/>
  ), [handlePress]);

  useEffect(()=>{
    ChatsManager.getInstance().init(getCurrentUserID())
  }, []);

  return (
    <FlatList
      data={chats}
      keyExtractor={(item: any, index: number) => item?.chat_id ? `${item?.chat_id}-chat` : String(index)}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainer}
      ListFooterComponent={<Spacer orientation="v" spacing={hp(10)}/>}
    />
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    width: "100%",
    height: hp("8.5%"),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
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
    height: 13,
    width: 13,
    backgroundColor: "#329E4F",
    borderRadius: 10,
    position: "absolute",
    right: 1,
    bottom: 8,
    borderColor: "white",
    borderWidth: 1,
  },
  contentContainer: {
    paddingHorizontal: "1%",
    paddingTop: "3%",
  },
  unseenMessagesView: {
    backgroundColor: "white",
    borderRadius: 999,
    height: 20,
    width: 20,
    alignSelf: "flex-end",
    margin: "2%",
    alignItems: "center",
  }
});
