import { textStyle } from "@/styles/textStyles";
import React, { memo, useState } from "react";
import { TextInput } from "react-native";
import { RTClient } from "@/src/rt_client/rt_client";
import { getCurrentUserID } from "@/utils/utils";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Send } from "lucide-react-native";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

function Input({ chatID, ref }: { chatID: number, ref:any }) {
  const { height } = useAnimatedKeyboard();
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState<string>("");

  async function handleFocus() {
    if(!isFocused){
      await RTClient.setTypingStatus(chatID, getCurrentUserID(), true);
      setIsFocused(true);
    }
  };

  async function handleBlur() {
    if(isFocused){
      await RTClient.setTypingStatus(chatID, getCurrentUserID(), false);
      setIsFocused(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -height.value }],
  }));

  const insets = useSafeAreaInsets();

  return (
      <Animated.View style={[styles.view, animatedStyle, {bottom: insets.bottom | 10}]}>
        <TextInput
          value={text}
          onChangeText={setText}
          style={[styles.input, textStyle.white18]}
          placeholder="Message..."
          placeholderTextColor={"rgba(255, 255, 255, 0.3)"}
          onFocus={handleFocus}
          onEndEditing={handleBlur}
          onChange={handleFocus}
          onBlur={handleBlur}
          multiline={true}
          numberOfLines={10}
          editable={true}
          scrollEnabled={true}
        />
        {isFocused && (
          <PressableScale
            style={styles.sendBtn}
            onPress={async () => {
              await RTClient.sendMessage(chatID, {
                chat_id: chatID,
                user_id: getCurrentUserID() ?? 0,
                message_type: "text",
                message: text,
              });
              setText("");
            }}
          >
            <Send height={26} width={30} strokeWidth={0.5} color="gray" fill="white" />
          </PressableScale>
        )}
      </Animated.View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  view: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#2C2C2C",
    borderColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 0.4,
    borderRadius: 22,
    paddingLeft: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  input:  {
    width: "80%",
    alignSelf: "center",
    alignContent: "center",
  },
  sendBtn: {
    backgroundColor: "#F0A500",
    width: 42,
    aspectRatio: 1,
    borderRadius: 21,
    justifyContent: "center",
    alignSelf: "flex-end",
    alignItems: "center",
  }
});