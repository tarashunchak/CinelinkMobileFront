import { textStyle } from "@/styles/textStyles";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function Input() {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState<string>();

  function handleFocus() {
    setIsFocused(true);
  };

  function handleBlur() {
    setIsFocused(false);
  };

  return (
    <View style={styles.view}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Message"
        placeholderTextColor={"rgba(255, 255, 255, 0.3)"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit={false}
        multiline={true}
        numberOfLines={10}
      />
      {
        isFocused &&
        (
          <TouchableOpacity
            style={styles.sendBtn.view}
            onPress={() => { console.log("Message: ", text); setText("") }}>
            <Image style={styles.sendBtn.img}
              source={require("@/app/chat/assets/send-03.png")} />
          </TouchableOpacity>
        )
      }
    </View>
  );
};

const styles = {
  view: {
    width: "94%",
    minHeight: hp(5.1),
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderRadius: hp(2.8),
    paddingRight: 2,
    paddingBottom: 2,
    paddingLeft: "5%",
    alignSelf: "center",
    marginBottom: "5%",
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