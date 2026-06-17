import { CreateWatchlist } from "@/api/watchlist/watchlist";
import HeaderContainer from "@/src/components/ui/header-container";
import ReturnArrowButton from "@/src/components/ui/returnArrowButton";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { textStyle } from "@/styles/textStyles";
import { BlurTargetView, BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, StyleSheet, Keyboard } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { WatchlistsManager } from "@/src/rt_client/managers/watchlists_manager";

export default function AddWatchlist() {
  const navigator = useNavigation();
  const inputRef = useRef(null);
  const [text, setText] = useState<string>("My Watchlist");
  const setBottomBarVisible = useBlurStore(state => state.setBottomBarVisible);

  const ref = useRef<View | null>(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500)

    setBottomBarVisible(false);

    return ()=> {
      setBottomBarVisible(true);
    }
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurTargetView ref={ref} style={StyleSheet.absoluteFill}>
        <Image style={StyleSheet.absoluteFill}
          source={{ uri: "https://i.pinimg.com/736x/16/47/66/164766dccc0a7083e1cd9e2167811026.jpg" }}
        />
      </BlurTargetView>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurTarget={ref}
        blurMethod="dimezisBlurView"
        tint="systemChromeMaterialDark"
        intensity={40}
        blurReductionFactor={5}
      />
      <TouchableWithoutFeedback style={StyleSheet.absoluteFill} onPress={Keyboard.dismiss}>
      <HeaderContainer style={{ flex: 1, paddingHorizontal: "1%" }}>
        <ReturnArrowButton />
        <View style={{ height: hp(80), alignItems: "center", justifyContent: "center"}}>
          <View style={{ gap: 30 }}>
            <Text style={[textStyle.white36, { fontWeight: "bold", textAlign: "center" }]}>
              Create your watchlist name
            </Text>
            <View>
              <TextInput
                ref={inputRef}
                value={text}
                onChangeText={setText}
                placeholderTextColor={"#304732"}
                style={[textStyle.white28, { textAlign: "center" }]}
                selectTextOnFocus
              />
              <View style={styles.line} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
              <PressableScale style={styles.cancelBtn} onPress={router.back}>
                <Text style={[textStyle.black22, {fontWeight: "bold"}]}>Cancel</Text>
              </PressableScale>
              <PressableScale style={styles.createBtn}
                onPress={async () => {
                  if (await CreateWatchlist(text)){
                    WatchlistsManager.getInstance().load();
                    router.back();
                  }
                }}>
                <Text style={[textStyle.white22, {fontWeight: "bold"}]}>Create</Text>
              </PressableScale>
            </View>
          </View>
        </View>
      </HeaderContainer>
</TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: wp(64),
    height: 2,
    backgroundColor: "#ACACAC",
    alignSelf: "center",
    borderRadius: 2,
    elevation: 20,
  },
  cancelBtn: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    backgroundColor: "white",
    borderColor: "white",
    height: 54,
    width: 120,
    borderRadius: 14,
    elevation: 5,
  },
  createBtn: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "rgba(30, 76, 68, 0.6)",
    backgroundColor: "#F0A500",
    //borderColor: "rgba(30, 76, 68, 1)",
    //borderWidth: 2,
    elevation: 5,
    height: 54,
    width: 120,
    borderRadius: 14,
  }
});