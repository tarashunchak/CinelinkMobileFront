import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ScreenBackground from "@/components/ui/screen-background";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { useEffect } from "react";
import { isAvailableAsync } from "expo-secure-store";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !isAuthGroup)
      router.replace("/login");
    else if(isAuthenticated && isAuthGroup)
      router.replace("/home");
  }, [isAuthenticated, segments])

  return (
    <Slot />
  );
};

/**
 * <ScreenBackground>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{
          flex: 1,
          backgroundColor: "transparent"
        }}>
          <BottomSheetModalProvider>
            <StatusBar style="auto" />
            <Slot />
            <Stack />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </ScreenBackground>
 */