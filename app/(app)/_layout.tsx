import ScreenBackground from "@/components/ui/screen-background";
import { Slot, Stack, Tabs } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from "react-native-keyboard-controller";
import { memo } from "react";
import { MessagesManager } from "./rt_client/managers/messages_manager";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { ChatsManager } from "./rt_client/managers/chats_manager";
import { WatchlistsManager } from "./rt_client/managers/watchlists_manager";
import { UsersManager } from "./rt_client/managers/users_manager";

function AppLayout() {
  const currentUserID = useAuthStore(state => state.user?.user_id);
  MessagesManager.getInstance().init(currentUserID);
  ChatsManager.getInstance().init(currentUserID);
  WatchlistsManager.getInstance().init(currentUserID);
  UsersManager.getInstance().init(currentUserID);

  return (
    <ScreenBackground>
      <GestureHandlerRootView style={{
        flex: 1,
        backgroundColor:"transparent",
      }}>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animationDuration: 100,
                contentStyle: {
                  backgroundColor:"transparent",
                },
              }}
            />
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ScreenBackground>
  );
};

export default memo(AppLayout);