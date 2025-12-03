import { API_URL } from "@/api/API_CONFIG";
import { CURRENT_USER } from "../currentUser";
import { WatchlistItem, Watchlist } from "./types";

export async function AddWatchlistItem(item: WatchlistItem) {
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

export async function GetUserWatchlists() {
  let response: Watchlist[] | any;
  await fetch(`${API_URL}/user/watchlist&userID=${CURRENT_USER.UID}`)
    .then(res => res.json)
    .then(data => {
      console.log(data)
      response = data;
    })
    .catch(err => console.error(err));

  console.log("GetUserWatchlists");
  return response;
};

export async function GetWatchlistItems(watchlistID: number) {
  let response: WatchlistItem[] | any;
  await fetch(`${API_URL}/user/watchlist&=${CURRENT_USER.UID}`)
    .then(res => res.json)
    .then(data => {
      console.log(data)
      response = data;
    })
    .catch(err => console.error(err));

  console.log("GetUserWatchlists");
  return response;
};
