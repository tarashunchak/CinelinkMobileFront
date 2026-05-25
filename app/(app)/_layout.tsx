import ScreenBackground, { useBlurStore } from "@/src/components/ui/screen-background";
import { Slot, Stack, Tabs, usePathname } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useEffect } from "react";
import { MessagesManager } from "@/src/rt_client/managers/messages_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { ChatsManager } from "@/src/rt_client/managers/chats_manager";
import { WatchlistsManager } from "@/src/rt_client/managers/watchlists_manager";
import { UsersManager } from "@/src/rt_client/managers/users_manager";
import BottomBar from "./bars/bottomBar";
import React from "react";
import { backgroundStyle } from "@/styles/backgroundStyle";


export default function AppLayout() {
  const currentUserID = useAuthStore(state => state.user?.user_id);
  const isBottomBarVisible = useBlurStore(state => state.isBottomBarVisible);
  useEffect(() => {
    if (currentUserID) {
      MessagesManager.getInstance().init(currentUserID);
      ChatsManager.getInstance().init(currentUserID);
      WatchlistsManager.getInstance().init(currentUserID);
      UsersManager.getInstance().init(currentUserID);
    }
  }, [currentUserID]);

  return (
    <>
      <ScreenBackground>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack screenOptions={{
              headerShown: false,
              animation: "ios_from_right",
              contentStyle: { backgroundColor: "transparent" },
            }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="movie_details" />
              <Stack.Screen name="direct_chat" />
              <Stack.Screen name="watchlist" />
              <Stack.Screen name="credit_details" />
              <Stack.Screen name="profile" />
            </Stack>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ScreenBackground>
      {isBottomBarVisible && <BottomBar />}
    </>
  );
};

//export default memo(AppLayout);


/**
 *     </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
 */