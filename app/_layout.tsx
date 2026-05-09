import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

export default function RootLayout() {
    return (
        <ActionSheetProvider>
            <GestureHandlerRootView style={{
                flex: 1,
                backgroundColor: "#000000"
            }}>
                <BottomSheetModalProvider>
                    <StatusBar translucent backgroundColor="transparent" style="auto" />
                    <Slot screenOptions={{ Animation: "fade" }} />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ActionSheetProvider>
    );
};