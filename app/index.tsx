/*import { enableScreens } from "react-native-screens";
enableScreens(false);*/

//Notifications.configure();

const originalFetch = globalThis.fetch;

globalThis.fetch = async (...args) => {
  console.warn("FETCH:", args[0]);

  return originalFetch(...args);
};

export default function App() {
  /*const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state.isHydrated);*/

  return null;
};

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