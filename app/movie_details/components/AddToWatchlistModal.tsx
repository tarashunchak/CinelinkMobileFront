import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { View } from "react-native";

export type WatchlistSheetRef = {
  open: () => void;
  close: () => void;
};

const WatchlistSheet = forwardRef<WatchlistSheetRef>((props: any, ref: any) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [300, 300], []);

  useImperativeHandle(ref, () => ({
    open: () => sheetRef.current?.snapToIndex(0),
    close: () => sheetRef.current?.close(),
  }));
  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={{ flex: 1, backgroundColor: "black" }}>

      </View>
    </BottomSheet>
  )
});

export default WatchlistSheet;