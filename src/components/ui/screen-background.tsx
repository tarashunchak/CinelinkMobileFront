import React, { memo } from "react";
import { View, StyleSheet } from "react-native";
import { BlurTargetView } from "expo-blur";
import { create } from "zustand";
import { useBlurTargetSetter } from "@/src/hooks/useBackgroundBlur";

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

export const ScreenBackground = memo(({ children }: Props) => {
  const setBlurTarget = useBlurTargetSetter();

  return (
    <BlurTargetView
      style={styles.blur}
      ref={setBlurTarget}
    >
      <View style={styles.background}>
        {children}
      </View>
    </BlurTargetView>
  );
});

const styles = StyleSheet.create({
  blur: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#31363F",
  },
});