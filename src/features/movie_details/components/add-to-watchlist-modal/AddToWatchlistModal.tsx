import React, { useState, forwardRef, useImperativeHandle, useMemo, useRef, useEffect, memo, useCallback } from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, TouchableWithoutFeedback, useBottomSheet, useBottomSheetInternal } from "@gorhom/bottom-sheet";
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
import Button from "./components/Button";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

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

  //const animatedIndex = use

  /*const buttonOpacity = useDerivedValue(() => {
    return interpolate(
      animatedIndex.value,
      [-1, 0, 1],
      [0, 1, 1],
      Extrapolate.CLAMP,
    );
  });*/
  const buttonOpacity = useSharedValue(0);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }))

  const onClose = useCallback(() => {
    buttonOpacity.value = withTiming(0);
    requestAnimationFrame(() => {
      setBottomBarVisible(true);
      sheetRef.current?.close();
      setIsActive(true);
      Keyboard.dismiss();
    })
  }, []);

  return (
    <>
      <BottomSheet
        ref={sheetRef}
        index={0}
        enableBlurKeyboardOnGesture
        animateOnMount={true}
        animationConfigs={animationConfigs}
        onChange={(index) => {
          if (index >= 0)
            buttonOpacity.value = withTiming(100);
          else
            buttonOpacity.value = withTiming(0);
        }}
        onClose={onClose}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={styles.handleIndicator}
        handleStyle={styles.handle}
        containerStyle={[styles.container]}
        backdropComponent={(props) =>
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
            height: "100%",
            backgroundColor: "#090405",
          }}>
          <View style={styles.mainView}>
            <View style={styles.searchBlockContainer}>
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
              renderItem={renderItem}
            />
          </View>
        </BottomSheetView>
      </BottomSheet >
      <Animated.View style={buttonAnimatedStyle}>
        <Button />
      </Animated.View>
    </>
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
    paddingRight: "5%",
    alignSelf: "flex-start",
    backgroundColor: "#222831",
    width: "100%",
    elevation: 10,
  },
});