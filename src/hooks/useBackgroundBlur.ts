import React, { useCallback, useSyncExternalStore } from "react";
import { View } from "react-native";

export const globalBlurTargetRef: React.MutableRefObject<View | null> = {
  current: null,
};

const subscribers = new Set<()=> void>();

const notify = () => subscribers.forEach((cb) => cb());

export const useBlurTargetSetter = () => {
  return useCallback((node: View | null) => {
    globalBlurTargetRef.current = node;
    notify();
  }, []);
};

export const useBlurTargetRef = () => {
  return globalBlurTargetRef;
}; 

export const useBlurTargetReady = () => {
  return useSyncExternalStore(
    (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    () => globalBlurTargetRef !== null,
    () => false,
  )
};