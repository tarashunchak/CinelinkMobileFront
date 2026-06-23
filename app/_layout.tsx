import React, { useCallback } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
//import { MessagesManager } from "@/src/rt_client/managers/messages_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { ChatsManager } from "@/src/rt_client/src/managers/chats_manager";
import { WatchlistsManager } from "@/src/rt_client/src/managers/watchlists_manager";
import { UsersManager } from "@/src/rt_client/src/managers/users_manager";
import { RecommendationsManager } from "@/src/rt_client/src/managers/recommendations_manager";
import { RTClient } from "@/src/rt_client/rt_client";

const managers: any[] = [
  //MessagesManager,
  ChatsManager,
  WatchlistsManager,
  UsersManager,
  RecommendationsManager,
];

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state.isHydrated);
  const currentUserID = useAuthStore(state => state.user?.user_id);

  const onReconnect = useCallback(()=>{
    managers.forEach(it => it.getInstance().init(currentUserID));
  }, [currentUserID]);

  useEffect(()=>{
    useAuthStore.getState().init();
    onReconnect();
  }, []);

  useEffect(() => {
    if (currentUserID) {
      RTClient.connect(currentUserID);
      RTClient.setOnReconnect(onReconnect);
    }
  }, [currentUserID]);


  useEffect(() => {
    const isAuthGroup = segments[0] === "(auth)";
    if (!isAuthenticated && !isAuthGroup)
      router.replace("/(auth)/login");
    else if(isAuthenticated && isAuthGroup)
      router.replace("/(app)/(tabs)/home");
  }, [isAuthenticated, segments, isHydrated])

  if(!isHydrated) 
    return null;

  return (
    <Slot/>
  );
};

/**
 * <ScreenBackground>
      <ActionSheetProvider>
        <GestureHandlerRootView style={{
          flex: 1,
          backgroundColor: "transparent"
        }}>
          <BottomSheetModalProvider>
            <StatusBar style="auto" />
            <Slot />
            <Stack />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ActionSheetProvider>
    </ScreenBackground>
 */