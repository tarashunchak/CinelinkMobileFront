import { ScreenBackground, useBlurStore } from "@/src/components/ui/screen-background";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {  GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from "react";
import { MessagesManager } from "@/src/rt_client/managers/messages_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { ChatsManager } from "@/src/rt_client/managers/chats_manager";
import { WatchlistsManager } from "@/src/rt_client/managers/watchlists_manager";
import { UsersManager } from "@/src/rt_client/managers/users_manager";
import BottomBar from "./bars/bottomBar";
import React from "react";
import { RTClient } from "@/src/rt_client/rt_client";
import { RecommendationsManager } from "@/src/rt_client/managers/recommendations_manager";
//import * as Notifications from "@/utils/notifications";

//Notifications.configure();

const managers: any[] = [
  //MessagesManager,
  ChatsManager,
  WatchlistsManager,
  UsersManager,
  RecommendationsManager,
];

export default function AppLayout() {
  const currentUserID = useAuthStore(state => state.user?.user_id);
  const isBottomBarVisible = useBlurStore(state => state.isBottomBarVisible);

  useEffect(() => {
    /*if (currentUserID) {
      RTClient.connect(currentUserID);
      //managers.forEach(it => it.getInstance().init(currentUserID));
    }*/
  }, [currentUserID]);

  return (
    <>
      <ScreenBackground>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <Stack screenOptions={{
              headerShown: false,
              animation: "ios_from_right",
              contentStyle: { backgroundColor: undefined },
              freezeOnBlur: true,
            }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="movie" />
              <Stack.Screen name="direct-chat"/>
              <Stack.Screen name="watchlist" />
              <Stack.Screen name="credit" />
              <Stack.Screen name="movie-credits" />
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