import { ScreenBackground, useBlurStore } from "@/src/components/ui/screen-background";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {  GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomBar from "./bars/bottomBar";
import React from "react";
//import * as Notifications from "@/utils/notifications";

//Notifications.configure();

const screenOptions = {
  headerShown: false,
  animation: "ios_from_right",
  contentStyle: { backgroundColor: undefined },
  freezeOnBlur: true,
  animationTypeForReplace:"push",
};

export default function AppLayout() {
  const isBottomBarVisible = useBlurStore(state => state.isBottomBarVisible);
  return (
    <>
      <ScreenBackground>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack screenOptions={screenOptions}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="movie" />
              <Stack.Screen name="direct_chat"/>
              <Stack.Screen name="watchlist" />
              <Stack.Screen name="credit_details" />
              <Stack.Screen name="movie_credits" />
              <Stack.Screen name="profile" />
              <Stack.Screen name="similar_movies" />
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