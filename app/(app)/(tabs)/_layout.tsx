import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
      <Tabs screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
        sceneStyle: {
          backgroundColor: "transparent",
        },
        animation: "shift",
        lazy: true,
      }}
      >
        <Tabs.Screen name="library" options={{ title: "Library" }} />
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="social" options={{ title: "Social" }} />
        <Tabs.Screen name="tab_profile" options={{ title: "Profile" }} />
      </Tabs>
  );
};

// {isBottomBarVisible && <BottomBar />}


/**
 *     </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
 */