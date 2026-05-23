import { CreateWatchlist } from "@/api/watchlist/watchlist";
import ReturnArrowButton from "@/components/ui/returnArrowButton";
import { textStyle } from "@/styles/textStyles";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, ImageBackground, View, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function AddWatchlist() {
  const navigator = useNavigation();
  const inputRef = useRef(null);
  const [text, setText] = useState<string>("My Watchlist");

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500)
  }, []);

  return (
    <ImageBackground style={{ flex: 1, padding: "2%", paddingTop: "5%" }} 
      source={require("@/app/(app)/library/assets/bluredBackground.png")}
    >
      <ReturnArrowButton/> 
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ gap: 30 }}>
          <Text style={textStyle.white30}>Create your watchlist name</Text>
          <View>
            <TextInput
              ref={inputRef}
              value={text}
              onChangeText={setText}
              placeholderTextColor={"#304732"}
              style={[textStyle.white28, { textAlign: "center" }]}
              selectTextOnFocus
            />
            <View style={styles.line}></View>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => navigator.goBack()}>
              <Text style={textStyle.white22}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn}
              onPress={async () => {
                if (await CreateWatchlist(text))
                  navigator.goBack();
              }}>
              <Text style={textStyle.white22}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = {
  line: {
    width: wp(64),
    height: 2,
    backgroundColor: "#ACACAC",
    alignSelf: "center",
    borderRadius: 2,
  },
  cancelBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    height: 54,
    width: 120,
    borderRadius: 14,
  },
  createBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30, 76, 68, 0.6)",
    borderColor: "rgba(30, 76, 68, 1)",
    borderWidth: 2,
    height: 54,
    width: 120,
    borderRadius: 14,
  }
};