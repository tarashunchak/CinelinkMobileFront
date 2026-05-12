import React from "react";
import TabNavigator from "@/navigation/TabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
import { RTClient } from "./rt_client/rt_client";
import * as Notifications from "@/utils/notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ChatsManager } from "./rt_client/managers/chats_manager";
import { UsersManager } from "./rt_client/managers/users_manager";
import { WatchlistsManager } from "./rt_client/managers/watchlists_manager";
import BottomBar from "./bars/bottomBar";

Notifications.configure();

const originalFetch = globalThis.fetch;

globalThis.fetch = async (...args) => {
  console.warn("FETCH:", args[0]);

  return originalFetch(...args);
};

export default function App() {
  useAuthStore.getState().init();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state.isHydrated);
  
  ChatsManager.getInstance().init(1);
  UsersManager.getInstance().init(1);
  WatchlistsManager.getInstance().init(1);

  RTClient.connect(useAuthStore?.getState()?.user?.user_id);
  return (
    <GestureHandlerRootView style={{
      flex: 1,
    }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          {isHydrated ? (isAuthenticated ? <TabNavigator /> : <AuthNavigator />) : null}
        </BottomSheetModalProvider>
        <BottomBar/>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};