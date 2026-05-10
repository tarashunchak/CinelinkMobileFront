import React from "react";
import TabNavigator from "@/navigation/TabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
import { RTClient } from "./rt_client/rt_client";
import * as Notifications from "@/utils/notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";

Notifications.configure();

export default function App() {
  useAuthStore.getState().init();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state.isHydrated);

  RTClient.connect(useAuthStore?.getState()?.user?.user_id);
  return (
    <GestureHandlerRootView style={{
      flex: 1,
    }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          {isHydrated ? (isAuthenticated ? <TabNavigator /> : <AuthNavigator />) : null}
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};