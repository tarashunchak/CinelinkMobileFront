import React, { useState, forwardRef, useImperativeHandle, useRef, memo, useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { View, StyleSheet, TextInput, Keyboard, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import WatchlistCard from "./components/WatchlistCard";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { textStyle } from "@/styles/textStyles";
import { useUserWatchlists } from "@/src/rt_client/src/managers/watchlists_manager";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { PressableScale } from "react-native-pressable-scale";
import { router } from "expo-router";

export type WatchlistSheetRef = {
  open: () => void;
  close: () => void;
};

type WatchlistSheetProps = {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const snapPoints = ["50%", "90%"];

const animationConfigs = {
  stiffness: 100,
  damping: 15,
  mass: 1,
};

const WatchlistSheet = forwardRef<WatchlistSheetRef, WatchlistSheetProps>(({ setIsActive }, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const [state, setState] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const watchlists = useUserWatchlists();
  const [picked, setPicked] = useState<Map<number, boolean>>(new Map());
  const setBottomBarVisible = useBlurStore(state => state.setBottomBarVisible);
  const [query, setQuery] = useState<string>("");

  const fetchedData = useMemo(() => {

  }, [query]);

  useImperativeHandle(ref, () => ({
    open: () => {
      setBottomBarVisible(false);
      sheetRef.current?.snapToIndex(0);
      setIsActive(true);
    },
    close: () => {
      setBottomBarVisible(true);
      sheetRef.current?.close();
      setIsActive(false);
    },
  }));

  const renderItem = useCallback(({ item }: any) => (
    <WatchlistCard watchlist={item} onPick={(id, state) => {
    }} />
  ), []);

  const handleNewWatchlistPress = useCallback(() => {
    router.push("/(app)/add_watchlist");
  }, []);

  //const animatedIndex = use

  /*const buttonOpacity = useDerivedValue(() => {
    return interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 1, 1],
      Extrapolate.CLAMP,
    );
  });*/
  const onClose = useCallback(() => {
    requestAnimationFrame(() => {
      setBottomBarVisible(true);
      sheetRef.current?.close();
      setIsActive(true);
      Keyboard.dismiss();
    })
  }, []);

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      enableBlurKeyboardOnGesture
      animateOnMount={true}
      animationConfigs={animationConfigs}
      onClose={onClose}
      snapPoints={snapPoints}
      enablePanDownToClose
      maxHeight={hp(90)}
      handleIndicatorStyle={styles.handleIndicator}
      handleStyle={styles.handle}
      containerStyle={[styles.container]}
      backdropComponent={(props: any) =>
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
          enableTouchThrough={false}
        />
      }
    >
      <BottomSheetView
        style={{
          maxHeight: "100%",
          //backgroundColor: "#090405",
          backgroundColor: "#101010",
        }}>
        <View style={styles.mainView}>
          <View style={styles.searchBlockContainer}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={"grey"}
              style={[styles.textInput, textStyle.white18]}
            />
            <PressableScale onPress={handleNewWatchlistPress}>
              <Text style={[textStyle.yellow14]}>New watchlist</Text>
            </PressableScale>
          </View>
          <FlatList
            contentContainerStyle={styles.contentContainer}
            data={watchlists}
            keyExtractor={(item, index) => String(index)}
            renderItem={renderItem}
          />
        </View>
      </BottomSheetView>
    </BottomSheet >
  )
});

export default memo(WatchlistSheet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#000000c0",
  },
  mainView: {
    flexDirection: "column",
  },
  textInput: {
    minWidth: "70%",
    maxWidth: "80%",
    height: 46,
    //backgroundColor: "#0C0C0C",
    backgroundColor: "#101010",
    borderColor: "rgba(255,255, 255, 0.3)",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: "2%",
    color: "white",
    elevation: 10,
  },
  handle: {
    backgroundColor: "#A27B5C",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  handleIndicator: {
    backgroundColor: "#fff",
    width: 40,
    height: 6,
    elevation: 8,
  },
  searchBlockContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "2%",
    gap: 10,
    alignSelf: "flex-start",
    backgroundColor: "#222831",
    width: "100%",
    elevation: 5,
  },
  contentContainer: {
    alignItems: "center",
    paddingVertical: "1%",
    paddingBottom: "5%",
    //gap: "1%",
  },
});