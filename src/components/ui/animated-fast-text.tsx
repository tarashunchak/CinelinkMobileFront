import React from "react";
import { memo } from "react";
import { createAnimatedComponent } from "react-native-reanimated";
import { Text } from "react-native";

const AnimatedFastText = createAnimatedComponent(Text);

export default AnimatedFastText;