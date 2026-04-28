import { API_URL } from "@/api/API_CONFIG";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { getCurrentUser, getCurrentUserID, jwtHeaders } from "@/utils/utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export function timestamp(date: Date) {
  return `${date.getHours()}:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`
};

export function calcLastSeen(timestamp: string): string {
  dayjs.extend(relativeTime);

  const lastSeen = dayjs(timestamp);
  return lastSeen.fromNow();
}

export async function GetDirectChatID(userID: number): Promise<number> {
  //if (1) return 3;
  const response = await fetch(`${API_URL}/chats/get-or-create/${userID}`, {
    headers: jwtHeaders(useAuthStore.getState().user?.jwt),
  });
  const text = await response.text();
  const data = JSON.parse(text);
  console.warn("GETDIRECTCHATID: ", data?.results);
  return data?.results;
};

export async function SetCallbacks(userID: number, chatID: number) {

}