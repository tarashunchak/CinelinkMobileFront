import { SendChatMessages } from "@/api/chats/messages";
import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RTClient } from "@/src/rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";

export default function Input({ sendMessage, chatID }: { sendMessage: any, chatID: number }) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState<string>();

  //const sendMessage = route?.params?.sendMessage;

  function handleFocus() {
    RTClient.setTypingStatus(chatID, getCurrentUserID(), true);
    setIsFocused(true);
  };

  function handleBlur() {
    RTClient.setTypingStatus(chatID, getCurrentUserID(), false);
    //setIsFocused(false);
  };

  return (
    <View style={styles.view}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Message..."
        placeholderTextColor={"rgba(255, 255, 255, 0.3)"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        multiline={true}
        numberOfLines={10}
      />
      {
        isFocused &&
        (
          <TouchableOpacity
            style={styles.sendBtn.view}
            onPress={() => {
              sendMessage(text);
              setText("")
            }}>
            <Image style={styles.sendBtn.img}
              source={require("@/app/(app)/group_chat/assets/send-03.png")} />
          </TouchableOpacity>
        )
      }
    </View >
  );
};

const styles = {
  view: {
    width: "94%",
    position: "absolute",
    bottom: "2%",
    zIndex: 2,
    minHeight: hp(5.1),
    //backgroundColor: "rgba(255, 255, 255, 0.03)",
    backgroundColor: "rgba(20, 20, 20, 1)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 0.5,
    borderRadius: hp(2.8),
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: "5%",
    alignSelf: "center",
    marginTop: "5%",
    flexDirection: "row",
  },
  input: [textStyle.white18, {
    width: "88%",
  }],
  sendBtn: {
    view: {
      backgroundColor: "#DEB522",
      width: "12%",
      aspectRatio: 1,
      borderRadius: 999,
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "flex-end"
    },
    img: {
      height: "65%",
      width: "65%",
      alignSelf: "center"
    },
  }
}