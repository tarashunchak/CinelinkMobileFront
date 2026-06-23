/*
  API_URL - адреса для API користувача в якого роль === user
  JWT_SELECTOR - функція для отримання Authorization хедера з JWT поточного користувача
  JWT_SELECTOR - функція для отримання id поточного користувача
*/
import { getCurrentUserID, jwtHeaders } from "@/utils/utils";

interface RTCLIENT_CONFIG_I  {
  API_URL: string | undefined;
  WS_URL: string | undefined;
  JWT_SELECTOR: (_:any | undefined) => {};
  CURR_USER_ID_SELECTOR: () => number | undefined;
};

export const RTCLIENT_CONFIG : RTCLIENT_CONFIG_I = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
  WS_URL: process.env.EXPO_PUBLIC_WS_URL,
  JWT_SELECTOR: jwtHeaders,
  CURR_USER_ID_SELECTOR: getCurrentUserID,
};