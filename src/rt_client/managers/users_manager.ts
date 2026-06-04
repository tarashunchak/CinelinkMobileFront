import { API_URL } from "@/api/API_CONFIG";
import { EMPTY_OBJECT, UserID } from "../models/models";
import { create } from "zustand";
import { EntityManager } from "./base_class";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { jwtHeaders } from "@/utils/utils";

type User_T = {
  user_id: number;
  username: string;
  avatar_url: string;
  is_online: boolean;
};

type UserProfile_T = {
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

interface UserState {
  users: Record<UserID, User_T>;
  userProfiles: Record<UserID, UserProfile_T>,
  onlineStatus: Record<UserID, boolean>;
  _setOnlineStatus: (userID: UserID, status: boolean) => void;
  _setManyOnlineStatus: (statuses: Map<UserID, boolean>) => void;
  _add: (userID: UserID, user: User_T) => void;
  _addUserProfile: (userID: UserID, user: UserProfile_T) => void;
  _addMany: (users: Map<UserID, User_T>) => void;
  _remove: (userID: UserID) => void;
  _update: (userID: UserID, data: Partial<User_T>) => void;
};

const useUserStore = create<UserState>((set) => ({
  users: {},
  userProfiles: {},
  onlineStatus: {},
  _setOnlineStatus: (userID, status) => set((s) => ({
    onlineStatus: { ...s.onlineStatus, [userID]: status }
  })),
  _setManyOnlineStatus: (statuses) => set((s) => ({
    onlineStatus: { ...s.onlineStatus, ...Object.fromEntries(statuses) }
  })),
  _add: (userID, user) => set((s) => ({
    users: { ...s.users, [userID]: user }
  })),
  _addUserProfile: (userID, user) => set((s) => ({
    userProfiles: { ...s.userProfiles, [userID]: user }
  })),
  _addMany: (newUsers) => set((s) => ({
    users: { ...s.users, ...Object.fromEntries(newUsers) }
  })),
  _remove: (userID) => set((s) => {
    const { [userID]: _, ...remainingUsers } = s.users;
    return { users: remainingUsers }
  }),
  _update: (userID, data) => set((s) => ({

  })),
}));

export class UsersManager extends EntityManager<User_T> {
  private currUserID: number = 0;
  private static instance: UsersManager;
  private isLoading: boolean = false;

  public static getInstance(): UsersManager {
    if (!UsersManager.instance)
      UsersManager.instance = new UsersManager();
    return UsersManager.instance;
  };

  public init(userID: UserID) {
    this.currUserID = userID;
    this.load();
  };

  public async load(userID: UserID = 0) {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      if (!userID) {
        const resp = await fetch(`${API_URL}/users/init/${this.currUserID}`, {
          headers: jwtHeaders(undefined)
        });
        
        const data = await resp.json();
        if (!resp.ok || data?.status !== 200) {
          console.log("Users init err: ", resp);
          return;
        };

        const map = new Map();
        const statuses = new Map();

        data?.results?.forEach((user: User_T) => {
          if (!user.avatar_url || user.avatar_url.length === 0)
            user.avatar_url = "https://i.pinimg.com/736x/56/65/e3/5665e34f05ce5e1270b81ee0f64922f3.jpg";
          map.set(user.user_id, user);
          statuses.set(user.user_id, user.is_online);
          console.log("user ", user?.user_id, " is online: ", user.is_online);
        });

        useUserStore.getState()._addMany(map);
        useUserStore.getState()._setManyOnlineStatus(statuses);
      } else {
        const resp = await fetch(`${API_URL}/users/${userID}`, {
          headers: jwtHeaders(undefined)
        });
        const data = await resp.json();
        if (!resp.ok || data?.status !== 200) {
          console.log("Users init err: ", resp);
          return;
        };

        useUserStore.getState()._addUserProfile(userID, data?.results);
      }

    } finally {
      this.isLoading = false;
    }
  };

  public setOnlineStatus(userID: UserID, status: boolean) {
    useUserStore.getState()._setOnlineStatus(userID, status);
  };

  public add(userID: UserID, user: any) {
    useUserStore.getState()._add(userID, user);
  };

  public addMany(users: Map<number, User_T>) {
    useUserStore.getState()._addMany(users);
  };

  public addArray(id: number, items: User_T[]): void {

  };

  public remove(userID: UserID) {
    useUserStore.getState()._remove(userID);
  };

  public update(userID: UserID, data: Partial<any>) {
    useUserStore.getState()._update(userID, data);
  };

  public get(userID: UserID = 0): User_T {
    const users = useUserStore.getState().users[userID];
    return users;
  };
};

async function load(userID: UserID = 0) {
  await UsersManager.getInstance().load(userID);
};

export function useUsers(): User_T[] {
  const users = useUserStore(useShallow((s) => Object.values(s.users)));
  useEffect(() => {
    console.warn("useUsers");
    if (users.length === 0)
      load();
  }, [users?.length]);
  return users;
};

export function useUserStatus(userID: UserID): boolean {
  const status = useUserStore(state => state.onlineStatus[userID] ?? false);
  useEffect(() => {
    console.warn("useUserStatus");
  }, [userID, status]);
  return status;
};

export function useUser(userID: UserID): UserProfile_T {
  const user = useUserStore(s => s.userProfiles[userID]);
  useEffect(() => {
    if (!user) load(userID);
    console.warn("useUser: ", user);
  }, [userID, user]);
  return user;
};