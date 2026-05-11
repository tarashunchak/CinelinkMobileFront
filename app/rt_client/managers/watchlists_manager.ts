import { API_URL } from "@/api/API_CONFIG";
import { WatchlistID } from "../models/models";
import { create } from "zustand";
import { EntinyManager } from "./base_class";

type Watchlist_T = {
  watchlist_id: number;
  name: string;
  fg_img_url?: string;
  bg_img_url?: string;
  creator_id?: number;
  creator_username?: string;
  movies_quanity?: number;
};

interface WatchlistState {
  watchlists: Record<WatchlistID, Watchlist_T>;
  _add: (watchlistID: WatchlistID, watchlist: Watchlist_T) => void;
  _addMany: (watchlists: Map<WatchlistID, Watchlist_T>) => void;
  _remove: (watchlistID: WatchlistID) => void;
  _update: (watchlistID: WatchlistID, data: Partial<Watchlist_T>) => void;
};

const useWatchlistStore = create<WatchlistState>((set) => ({
  watchlists: {},
  _add: (watchlistID, watchlist) => set((s) => ({
    watchlists: {...s.watchlists, [watchlistID]: watchlist}
  })),
  _addMany: (newWatchlists) => set((s) => ({
    watchlists: {...s.watchlists, ...newWatchlists}
  })),
  _remove: (watchlistID) => set((s)=>{
    const {[watchlistID]: _, ...remainingWatchlists } = s.watchlists;
    return {watchlists: remainingWatchlists}
  }),
  _update: (watchlistID, data) => set((s)=>({

  })),
}));

export class WatchlistsManager extends EntinyManager<Watchlist_T> {
  public async load(watchlistID: WatchlistID) {
    const resp = await fetch(`${API_URL}`);
    const data = await resp.json();
    if(!resp.ok || data?.status !== 200)
      return;

    useWatchlistStore.getState()._addMany(data?.results);
  };

  public add(watchlistID: WatchlistID, watchlist: any){
    useWatchlistStore.getState()._add(watchlistID, watchlist);
  };

  public addMany(watchlists: Map<number, Watchlist_T>){
    useWatchlistStore.getState()._addMany(watchlists);
  };

  public remove(watchlistID: WatchlistID) {
    useWatchlistStore.getState()._remove(watchlistID);
  };

  public update(watchlistID: WatchlistID, data: Partial<any>) {
    useWatchlistStore.getState()._update(watchlistID, data);
  };
};