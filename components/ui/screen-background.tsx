import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import React, { memo, useEffect, useMemo, useRef } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { BlurTargetView } from "expo-blur";
import BottomBar from "@/app/(app)/bars/bottomBar";
import { create } from "zustand";

interface BlurState {
  blurTargetRef: React.RefObject<View | null> | null;
  setBlurTargetRef: (ref: React.RefObject<View | null> | null) => void;
  isBottomBarVisible: boolean;
  setBottomBarVisible: (visible: boolean) => void;
};

export const useBlurStore = create<BlurState>((set)=>({
  blurTargetRef: null,
  setBlurTargetRef: (ref) => set({blurTargetRef: ref}),
  isBottomBarVisible: true,
  setBottomBarVisible: (visible) => set({isBottomBarVisible: visible}),
}));

interface Props {
  children: any;
  showBottomBar?: boolean | true;
};

export default function ScreenBackground({ children, showBottomBar }: Props ) {
  const ref = useRef<View | null>(null);
  const isBottomBarVisible = useBlurStore((state) => state.isBottomBarVisible);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setBlurTargetRef = useBlurStore(state => state.setBlurTargetRef);

  useEffect(()=>{
    if(ref.current)
      setBlurTargetRef(ref);
  }, [setBlurTargetRef]);

  return (
    <>
      <BlurTargetView style={{ flex: 1 }} ref={ref}>
        <View style={styles.background}>
          <Image
            source={ isAuthenticated ?
                require("../../assets/images/background.png")
                : require("../../assets/images/authBackground.png")
            }
            style={StyleSheet.absoluteFillObject}
            contentFit="fill"
            cachePolicy="disk"
          />
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </View>
      </BlurTargetView>
      {isBottomBarVisible && <BottomBar />}
    </>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
});