import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import React, { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { ImageBackground, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { BlurTargetView } from "expo-blur";
import BottomBar from "@/app/(app)/bars/bottomBar";
import { create } from "zustand";
import { useBlurTargetRef, useBlurTargetSetter } from "@/src/hooks/useBackgroundBlur";

interface BlurState {
  blurTargetRef: React.RefObject<View | null> | undefined;
  setBlurTargetRef: (ref: React.RefObject<View | null> | undefined) => void;
  isBottomBarVisible: boolean;
  setBottomBarVisible: (visible: boolean) => void;
};

export const useBlurStore = create<BlurState>((set) => ({
  blurTargetRef: undefined,
  setBlurTargetRef: (ref) => set({ blurTargetRef: ref }),
  isBottomBarVisible: true,
  setBottomBarVisible: (visible) => set({ isBottomBarVisible: visible }),
}));

interface Props {
  children: React.ReactNode;
};

export default function ScreenBackground({ children }: Props) {
  //const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  //const setBlurTargetRef = useBlurStore(state => state.setBlurTargetRef);
  //const ref = useRef<any>(null);

  /*const onRefChange = (node: View | null)=>{
    if(node) {
      setBlurTargetRef(node)
      return node;
    }else{
      setBlurTargetRef(null)
    };*/
/*
  useEffect(()=>{
    setBlurTargetRef(ref);
  }, [setBlurTargetRef]);
  */

  const setBlurTarget = useBlurTargetSetter();

  return (
    <BlurTargetView
      style={{ flex: 1 }}
      ref={setBlurTarget}
    >
      <View style={styles.background}>
        <Image
          source={require("@/assets/images/background.png")}
          style={StyleSheet.absoluteFill}
          contentFit="fill"
          cachePolicy="disk"
        />
        <View style={{ flex: 1 }}>
          {children}
        </View>
      </View>
    </BlurTargetView>
  )
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
  },
});