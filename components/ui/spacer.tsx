import React from "react";
import { View } from "react-native";

interface Props {
  orientation?: string | "v";
  spacing?: number | 5,
};

export default function Spacer({ orientation, spacing }: Props) {
  const styles = orientation === "v"
    ? {
      height: spacing,
      width: 0,
    }
    : {
      height: 0,
      width: spacing,
    };

  return (
    <View style={styles} />
  )
};