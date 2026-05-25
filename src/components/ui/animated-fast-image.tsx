import { Image } from "expo-image";
import { memo } from "react";
import { createAnimatedComponent } from "react-native-reanimated";

const AnimatedFastImage = createAnimatedComponent(Image);

export default memo(AnimatedFastImage);