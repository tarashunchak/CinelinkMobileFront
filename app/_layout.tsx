import { ClerkProvider } from "@clerk/expo";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { tokenCache } from "@clerk/expo/token-cache";

export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <GestureHandlerRootView style={{
                flex: 1,
                backgroundColor: "#000000"
            }}>
                <StatusBar translucent backgroundColor="transparent" style="light" />
                <Slot />
            </GestureHandlerRootView>
        </ClerkProvider >
    );
};