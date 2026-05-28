import React, { useState, forwardRef, useImperativeHandle, useMemo, useRef, useEffect } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import WatchlistCard from "./components/WatchlistCard";
import { GetUserWatchlists } from "@/api/watchlist/watchlist";
import { getCurrentUserID } from "@/utils/utils";
import Button from "./components/Button";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { BlurView } from "expo-blur";
import { useBlurTargetReady, useBlurTargetRef } from "@/src/hooks/useBackgroundBlur";

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
  const [watchlists, setWatchlists] = useState<any[]>([]);
  const [picked, setPicked] = useState<Map<number, boolean>>(new Map());
  const blurRef = useBlurTargetRef();
  const isReady = useBlurTargetReady();
  const setBottomBarVisible = useBlurStore(state => state.setBottomBarVisible);

  useEffect(() => {
    async function loadContent() {
      const data = await GetUserWatchlists(getCurrentUserID());
      if (data) setWatchlists(data);
    };
    loadContent();
  }, [state]);

  useImperativeHandle(ref, () => ({
    open: () => {
      sheetRef.current?.snapToIndex(0);
      setBottomBarVisible(false);
      setIsActive(true);
    },
    close: () => {
      sheetRef.current?.close();
      setIsActive(false);
    },
  }));

  const backgroundColor = useMemo(() => {
    return state ? { backgroundColor: "rgba(0, 0, 0, 0.6)" } : { backgroundColor: "transparent" };
  }, [state]);

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      onClose={() => {
        setIsActive(true);
        setBottomBarVisible(true);
      }}
      snapPoints={snapPoints}
      enablePanDownToClose
      handleStyle={{
        backgroundColor:"grey",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
      }}
      containerStyle={[styles.container, backgroundColor]}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          enableTouchThrough
        >
          {isReady && <BlurView
            tint="systemMaterialDark"
            intensity={120}
            blurMethod="dimezisBlurView"
            style={StyleSheet.absoluteFill}
          />}
        </BottomSheetBackdrop>
      )
      }
    >
      <BottomSheetView style={{ height: "100%", backgroundColor: "black" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ justifyContent: "space-between" }}>
          <View style={styles.mainView}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={"grey"}
              style={styles.textInput}
            />
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
          {<View style={{ zIndex: 10, backgroundColor: "white", height: hp(20), width: wp(100), position: "absolute", bottom: 0, left: 0 }}>
            <Button />
          </View>}
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