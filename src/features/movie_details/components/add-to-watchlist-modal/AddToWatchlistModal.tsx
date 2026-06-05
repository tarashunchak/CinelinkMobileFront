import React, { useState, forwardRef, useImperativeHandle, useMemo, useRef, useEffect } from "react";
import BottomSheet, { BottomSheetView, TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import WatchlistCard from "./components/WatchlistCard";
import { GetUserWatchlists } from "@/api/watchlist/watchlist";
import { getCurrentUserID } from "@/utils/utils";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { Search } from "lucide-react-native";
import { textStyle } from "@/styles/textStyles";
import { useUserWatchlists } from "@/src/rt_client/managers/watchlists_manager";
import { BlurView } from "expo-blur";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export type WatchlistSheetRef = {
  open: () => void;
  close: () => void;
};

type WatchlistSheetProps = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const snapPoints = ["50%", "90%"];

const WatchlistSheet = forwardRef<WatchlistSheetRef, WatchlistSheetProps>(({ setIsActive }, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [state, setState] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const watchlists = useUserWatchlists();
  const [picked, setPicked] = useState<Map<number, boolean>>(new Map());
  const setBottomBarVisible = useBlurStore(state => state.setBottomBarVisible);

  useEffect(() => {
    async function loadContent() {
      /*const data = await GetUserWatchlists(getCurrentUserID());
      if (data) setWatchlists(data);*/
    };
    loadContent();
  }, [state]);

  useImperativeHandle(ref, () => ({
    open: () => {
      sheetRef.current?.snapToIndex(0);
      setBottomBarVisible(false);
      setIsActive(true);
      setState(true);
    },
    close: () => {
      sheetRef.current?.close();
      setIsActive(false);
      setState(false);
    },
  }));

  const backgroundColor = useMemo(() => {
    return state ? { backgroundColor: "rgba(0, 0, 0, 0.8)" } : { backgroundColor: "transparent" };
  }, [state]);

  return (
    
      <BottomSheet
        ref={sheetRef}
        index={0}
        enableBlurKeyboardOnGesture
        animateOnMount={true}
        animationConfigs={{
          stiffness: 100,
          damping: 15,
          mass: 1,
        }}
        onClose={() => {
          setState(false);
          setIsActive(true);
          setBottomBarVisible(true);
          Keyboard.dismiss();
        }}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={{
          backgroundColor: "#fff",
          width: 40,
          height: 6,
          elevation: 8,
        }}
        handleStyle={{
          backgroundColor: "#A27B5C",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
        }}
        containerStyle={[styles.container, backgroundColor]}
      >
        <BottomSheetView style={{
          height: "100%",
          backgroundColor: "#090405",
        }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ justifyContent: "space-between" }}>
            <View style={styles.mainView}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingRight: "5%", alignSelf: "flex-start", backgroundColor: "#222831", width: "100%", elevation: 10 }}>
                <TextInput
                  placeholder="Search"
                  placeholderTextColor={"grey"}
                  style={[styles.textInput, textStyle.white18]}
                />
                <Search width={34} height={34} color="white" strokeWidth={1} />
              </View>
              <FlatList
                style={{ height: "100%" }}
                data={watchlists}
                numColumns={3}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ item }) => (
                  <WatchlistCard watchlist={item} onPick={(id, state) => {
                  }} />
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
    backgroundColor: "#0C0C0C",
    borderColor: "rgba(255,255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    margin: "2%",
    paddingLeft: "2%",
    color: "white",
    elevation: 10,
  },
});