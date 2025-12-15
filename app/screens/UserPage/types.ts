export type UserProfile_T = {
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  joined_at: string | null;
  bio: string | null;
  avatar_url: string | null;
  bg_img_url: string | null;
  followers: number | null;
  followings: number | null;
  is_following: boolean | null;
  posts: number | null;
};

export interface Post {
  username: string;
  image_url: string;
  posted_at: string;
  content: {
    type: string;
  }
};