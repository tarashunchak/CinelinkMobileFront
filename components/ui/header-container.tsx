import React, { memo, useEffect } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HeaderContainer({children, style}: {children: any, style?: StyleProp<ViewStyle>}){
  const insets = useSafeAreaInsets();

  useEffect(()=>{}, [insets.top])

  return (
    <View style={{...style, paddingTop: insets.top}}>
      {children}
    </View>
  )
};

export default memo(HeaderContainer);