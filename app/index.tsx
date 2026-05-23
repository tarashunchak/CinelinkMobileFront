import React, { memo } from "react";
import TabNavigator from "@/navigation/TabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
//import * as Notifications from "@/utils/notifications";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useRouter } from "expo-router";

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

  const router = useRouter();

  if(isAuthenticated)
    router.replace("/home");
  else
    router.replace("/login");


  return (null);
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