export type WatchlistItem = {
  id: number;
  user_id: number;
  movie_id: any;
  watchlist_id: number;
};

export type Watchlist = {
  id: number;
  name: string;
  description: string;
  is_public: boolean;
  bg_img_path: string;
  fg_img_path: string;
};

