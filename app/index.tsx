import { StatusBar } from "expo-status-bar";
import React from "react";
import TabNavigator from "@/navigation/tabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store"
import { RTClient } from "./rt_client/rt_client";
import MeetUpScreen from "./meetup/MeetUpScreen";
import { getCurrentUser, getCurrentUserID } from "@/utils/utils";

export default function App() {
  useAuthStore.getState().init();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isHydrated = useAuthStore(state => state.isHydrated);

  RTClient.connect(getCurrentUserID());

  return (
    <>
      <StatusBar hidden={true} />
      {isHydrated ? (isAuthenticated ? <TabNavigator /> : <AuthNavigator />) : null}
    </>
  );
};

//<MeetUpScreen />