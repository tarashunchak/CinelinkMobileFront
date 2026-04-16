import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { View } from "react-native";

export type WatchlistSheetRef = {
  open: () => void;
  close: () => void;
};

const WatchlistSheet = forwardRef<WatchlistSheetRef>((props: any, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  useImperativeHandle(ref, () => ({
    open: () => {
      console.warn("Open called");
      sheetRef.current?.snapToIndex(0);
    },
    close: () => { sheetRef.current?.close() },
  }));
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={{ width: "100%", height: "100%", backgroundColor: "black" }}>

      </View>
    </BottomSheet>
  )
});

export default WatchlistSheet;