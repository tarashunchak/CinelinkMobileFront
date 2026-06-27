import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { PressableScale } from "react-native-pressable-scale";
import { Check } from "lucide-react-native"

interface Props {
  onPress: () => void;
  size: number;
  state: boolean | false;
};

export default function CircleCheckbox({ onPress, size, state }: Props) {
  const style = useMemo(() => ({
    height: size,
    aspectRatio: 1,
    backgroundColor: state ? "#34C759" : "transparent",
  }), [state, size]);

  const handlePress = useCallback(() => {
    onPress();
  }, [onPress, size]);

  return (
    <PressableScale
      onPress={handlePress}
      style={[styles.view, style]}
    >
      {state && <Check strokeWidth={3} color="white" size={size * 0.9} />}
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  view: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});