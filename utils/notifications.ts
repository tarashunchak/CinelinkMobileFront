/*import { API_URL } from "@/api/API_CONFIG";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { jwtHeaders } from "./utils";

export async function requestUserPermission() {
  console.warn("Requst user permission 1");
  if (!Device.isDevice) return;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  console.warn("Requst user permission 2");
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  console.warn("Requst user permission 3");
  if (finalStatus !== "granted") return;

  await sendTokenToBackend(await getToken());
};

export async function getToken(): Promise<string> {
  return (await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas?.projectId,
  })).data;
};

export async function sendTokenToBackend(token: string) {
  //const userID = useAuthStore.getState().user?.user_id;
  await fetch(`${API_URL}/users/device-token`, {
    method: "POST",
    headers: jwtHeaders(undefined),
    body: JSON.stringify({
      token: token,
      device_name: Platform.OS + ' ' + Platform.Version,
    })
  })
};

export async function configure() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};*/