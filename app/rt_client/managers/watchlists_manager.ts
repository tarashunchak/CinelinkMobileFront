import { API_URL } from "@/api/API_CONFIG";
import { useChatStore } from "../app_state";
import { WatchlistID } from "../models/models";

export class WatchlistsManager{
  public async loadWatchlists(watchlistID: WatchlistID) {
    const resp = await fetch(`${API_URL}`);
    const data = await resp.json();
    if(!resp.ok || data?.status !== 200)
      return;

    useChatStore.getState()._setWatchlistsBatch();
  };

  public addWatchlist(userID: UserID, user: any){
    useChatStore.getState()._setWatchlist(userID, user);
  };

  public removeWatchlist(userID: UserID) {
    useChatStore.getState()._removeWatchlist(userID);
  };
};