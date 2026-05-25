import React, { memo, useEffect, useRef } from "react";
import TabNavigator from "@/navigation/TabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
//import * as Notifications from "@/utils/notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Redirect, Slot, useRouter } from "expo-router";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import { useBlurStore } from "@/src/components/ui/screen-background";
import { enableScreens } from "react-native-screens";
enableScreens(false);

//Notifications.configure();

const originalFetch = globalThis.fetch;

globalThis.fetch = async (...args) => {
  console.warn("FETCH:", args[0]);

  return originalFetch(...args);
};

function App() {
  useAuthStore.getState().init();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state.isHydrated);

  if(isAuthenticated && isHydrated)
    return <Redirect href="/(app)/(tabs)/home" />

  return <Redirect href="/(auth)/login" />
};

export default memo(App);


/**
 *     <GestureHandlerRootView style={{
      flex: 1,
    }}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          {isHydrated ? (isAuthenticated ? <TabNavigator /> : <AuthNavigator />) : null}
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
 */