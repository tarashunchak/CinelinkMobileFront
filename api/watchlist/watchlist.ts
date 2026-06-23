import { API_URL } from "@/api/API_CONFIG";
import { WatchlistItem_T } from "./types";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { jwtHeaders } from "@/utils/utils";
import { WatchlistsManager } from "@/src/rt_client/src/managers/watchlists_manager";

export async function AddWatchlistItem(item: WatchlistItem_T) {
  try{
  await fetch(`${API_URL}/user/watchlist`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      ...jwtHeaders(undefined)
    },
    body: JSON.stringify(item),
  })
    .then(res => res.json)
    .then(data => console.log(data))
    .catch(err => console.error(err));

  }finally{
    WatchlistsManager.getInstance().load();
  }
  //console.log("AddWatchlistItem");
};

export async function GetUserWatchlists(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/watchlists`, {
    headers: jwtHeaders(undefined)
  });
  const data = await response.json();
  return data?.results;
};

export async function GetWatchlistMovies(watchlistID: number) {
  const response = await fetch(`${API_URL}/watchlists/${watchlistID}`, {
    headers: jwtHeaders(undefined)
  })
  const data = await response.json();
  return data?.results;
};

export async function CreateWatchlist(name: string): Promise<boolean> {
  const jwt = useAuthStore.getState().user?.jwt;
  //console.log("Current user: ", userID);
  const response = await fetch(`${API_URL}/users/watchlists`,
    {
      method: "POST",
      headers: { ...jwtHeaders(jwt), "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }
  );
  //console.warn("WATCHLIST RETURN DATA 1: ", response)
  const data = await response.json();
  //console.warn("WATCHLIST RETURN DATA 2: ", data)
  return data?.status == 200;
}
