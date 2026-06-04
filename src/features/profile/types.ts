export type UserProfile_T = {
  first_name: string;
  last_name: string;
  username: string;
  created_at: string;
  bio: string;
  avatar_url: string;
  bg_img_url: string;
  followers: number;
  followings: number;
  is_following: boolean;
  posts: number;
  followers_ids: number[];
  followings_ids: number[];
};

export interface Post {
  username: string;
  image_url: string;
  posted_at: string;
  content: {
    type: string;
  }
};