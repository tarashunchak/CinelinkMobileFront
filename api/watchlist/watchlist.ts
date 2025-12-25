import { API_URL } from "@/api/API_CONFIG";
import { CURRENT_USER } from "../currentUser";
import { WatchlistItem_T, WatchlistCard } from "./types";

export async function AddWatchlistItem(item: WatchlistItem_T) {
  await fetch(`${API_URL}/user/watchlist`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  })
    .then(res => res.json)
    .then(data => console.log(data))
    .catch(err => console.error(err));

  console.log("AddWatchlistItem");
};

export async function GetUserWatchlists(userID: number) {
  const response = await fetch(`${API_URL}/users/${userID}/watchlists`);
  const data = await response.json();
  return data?.results;
};

export async function GetWatchlistMovies(watchlistID: number) {
  const response = await fetch(`${API_URL}/watchlists/${watchlistID}`)
  const data = await response.json();
  return data?.results;
};
