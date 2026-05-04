import React, { useState, forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import BottomSheet, { BottomSheetView, TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import WatchlistCard from "./components/WatchlistCard";

export type WatchlistSheetRef = {
  open: () => void;
  close: () => void;
};

const WatchlistSheet = forwardRef<WatchlistSheetRef>((props: any, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [state, setState] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const snapPoints = {};

  useImperativeHandle(ref, () => ({
    open: () => {
      sheetRef.current?.expand();
      setState(true);
    },
    close: () => {
      sheetRef.current?.close();
      setState(false);
    },
  }));

  const backgroundColor = useMemo(() => {
    return state ? { backgroundColor: "rgba(0, 0, 0, 0.6)" } : { backgroundColor: "transparent" };
  }, [state])

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={["50%", "90%"]}
      enablePanDownToClose
      onClose={() => setState(false)}
      containerStyle={[styles.container, backgroundColor]}
      animationConfigs={{
        damping: 1000,
        stiffness: 250,
        mass: 0.8,
      }}
    >
      <BottomSheetView style={{ height: "100%", backgroundColor: "black" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainView}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={"grey"}
              style={styles.textInput}
            />
            <FlatList
              data={[0, 0, 0, 0, 0]}
              numColumns={3}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item }) => (
                <WatchlistCard watchlist={item} />
              )}
            />
          </View>
        </TouchableWithoutFeedback>
      </BottomSheetView>
    </BottomSheet >
  )
});

export default WatchlistSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    flexDirection: "column",
  },
  textInput: {
    width: "80%",
    height: 46,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255,255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    margin: "2%",
    paddingLeft: "2%",
  },
});