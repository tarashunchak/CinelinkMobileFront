import React from "react";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ScreenBackground, { useBlurStore } from "@/src/components/ui/screen-background";
import { useEffect } from "react";
import { isAvailableAsync } from "expo-secure-store";
import { MessagesManager } from "@/src/rt_client/managers/messages_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { ChatsManager } from "@/src/rt_client/managers/chats_manager";
import { WatchlistsManager } from "@/src/rt_client/managers/watchlists_manager";
import { UsersManager } from "@/src/rt_client/managers/users_manager";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const currentUserID = useAuthStore(state => state.user?.user_id);
  const isBottomBarVisible = useBlurStore(state => state.isBottomBarVisible);
  useEffect(() => {
    //MessagesManager.getInstance().init();
    ChatsManager.getInstance().init(currentUserID);
    WatchlistsManager.getInstance().init(currentUserID);
    UsersManager.getInstance().init(currentUserID);
  }, [currentUserID]);

  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !isAuthGroup)
      router.replace("/(auth)");
    else if(isAuthenticated && isAuthGroup)
      router.replace("(tabs)");
  }, [isAuthenticated, segments])

  return (
    <Slot/>
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