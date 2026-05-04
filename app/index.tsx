import React from "react";
import TabNavigator from "@/navigation/TabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
import { RTClient } from "./rt_client/rt_client";
import * as Notifications from "@/utils/notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <BottomSheetModalProvider>
        {isHydrated ? (isAuthenticated ? <TabNavigator /> : <AuthNavigator />) : null}
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};