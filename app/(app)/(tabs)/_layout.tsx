import { Tabs } from "expo-router";
import React, { memo } from "react";

const screenOptions = {
  headerShown: false,
  tabBarStyle: { display: "none" },
  sceneStyle: {
    backgroundColor: "transparent",
  },
  animation: "shift",
  lazy: true,
};

function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions} backBehavior="initialRoute" initialRouteName="home">
      <Tabs.Screen name="library" options={{ title: "Library" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen name="home" options={{ title: "Home"}} />
      <Tabs.Screen name="social" options={{ title: "Social" }} />
      <Tabs.Screen name="tab_profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default memo(TabLayout);

// {isBottomBarVisible && <BottomBar />}


/**
 *     </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
 */