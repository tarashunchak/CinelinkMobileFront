import ScreenBackground from "@/components/ui/screen-background";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function AuthLayout(){
  return (
    <ScreenBackground>
        <Slot />
    </ScreenBackground>
  );
};
