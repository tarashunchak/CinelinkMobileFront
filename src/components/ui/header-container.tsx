import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HeaderContainer({children, style}: {children: any, style?: StyleProp<ViewStyle>}){
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{...style, paddingTop: insets.top}}
    >
      {children}
    </View>
  )
};