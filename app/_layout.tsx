import 'react-native-reanimated';
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{
            flex: 1,
            backgroundColor: "#000000"
        }}>
            <StatusBar translucent backgroundColor="transparent" style="light" />
            <Slot />
        </GestureHandlerRootView>
    );
};