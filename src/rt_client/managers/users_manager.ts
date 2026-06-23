import { EMPTY_ARRAY, EMPTY_OBJECT, UserID } from "../models/models";
import { create } from "zustand";
import { EntityManager } from "./base_class";
import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { RTCLIENT_CONFIG } from "./../config";

type User_T = {
  user_id: number;
  username: string;
  avatar_url: string;
  is_online: boolean;
};

type UserProfile_T = {
  user_id: number;
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
  is_online: boolean;
  updated_at: Date | number;
};

interface UserState {
  //users: Record<UserID, User_T>;
  userProfiles: Record<UserID, UserProfile_T>,
  onlineStatus: Record<UserID, boolean>;
  _setOnlineStatus: (userID: UserID, status: boolean) => void;
  _setManyOnlineStatus: (statuses: Map<UserID, boolean>) => void;
  _add: (userID: UserID, user: UserProfile_T) => void;
  _addUserProfile: (userID: UserID, user: UserProfile_T) => void;
  _addMany: (users: Map<UserID, UserProfile_T>) => void;
  _remove: (userID: UserID) => void;
  _update: (userID: UserID, data: Partial<UserProfile_T>) => void;
};

export const useUserStore = create<UserState>((set) => ({
  //users: {},
  userProfiles: {},
  onlineStatus: {},
  _setOnlineStatus: (userID, status) => set((s) => ({
    onlineStatus: { ...s.onlineStatus, [userID]: status }
  })),
  _setManyOnlineStatus: (statuses) => set((s) => ({
    onlineStatus: { ...s.onlineStatus, ...Object.fromEntries(statuses) }
  })),
  _add: (userID, user) => set((s) => ({
    userProfiles: { 
      ...s.userProfiles, 
      [userID]: user }
  })),
  _addUserProfile: (userID, user) => set((s) => ({
    userProfiles: { ...s.userProfiles, [userID]: user }
  })),
  _addMany: (newUsers) => set((s) => ({
    //users: { ...s.users, ...Object.fromEntries(newUsers) }
    userProfiles: { ...s.userProfiles, ...Object.fromEntries(newUsers) }
  })),
  _remove: (userID) => set((s) => {
    const { [userID]: _, ...remainingUsers } = s.userProfiles;
    return { usersProfiles: remainingUsers }
  }),
  _update: (userID, data) => set((s) => ({

  })),
}));

export class UsersManager extends EntityManager<UserProfile_T> {
  private currUserID: number = 0;
  private static instance: UsersManager;
  private loadingState = new Map<UserID, boolean>();
  private isInitLoading: boolean = false;

  public static getInstance(): UsersManager {
    if (!UsersManager.instance)
      UsersManager.instance = new UsersManager();
    return UsersManager.instance;
  };

  public init(userID: UserID) {
    this.currUserID = userID;
    this.initLoading(userID);
  };

  public async initLoading(userID: number) {
    if (this.isInitLoading) return;
    this.isInitLoading = true;
    try {
      const resp = await fetch(`${RTCLIENT_CONFIG.API_URL}/users/init/${userID ?? this.currUserID}`, {
        headers: RTCLIENT_CONFIG.JWT_SELECTOR(undefined)
      });

      const data = await resp.json();
      if (!resp.ok || data?.status !== 200) {
        //console.log("Users init err: ", resp);
        return;
      };

      const map = new Map();
      const statuses = new Map();

      data?.results?.forEach((user: UserProfile_T) => {
        if (!user.avatar_url || user.avatar_url.length === 0)
          user.avatar_url = "https://i.pinimg.com/736x/56/65/e3/5665e34f05ce5e1270b81ee0f64922f3.jpg";
        map.set(user.user_id, user);
        statuses.set(user.user_id, user.is_online);
        //console.log("user ", user?.user_id, " is online: ", user.is_online);
        user.updated_at = Date.now();
      });

      this.addMany(map);
      useUserStore.getState()._setManyOnlineStatus(statuses);
    } finally {
      this.isInitLoading = false;
    }
  };

  public async load(userID: UserID) {
    //console.warn("LOAD USER: ", userID);
    try {
      //if (this.loadingState.get(userID)) return;
      //this.loadingState.set(userID, true);
      const resp = await fetch(`${RTCLIENT_CONFIG.API_URL}/users/${userID}`, {
        headers: RTCLIENT_CONFIG.JWT_SELECTOR(undefined)
      });
      const data = await resp.json();
      if (!resp.ok || data?.status !== 200) {
        //console.log("Users GET err: ", resp);
        return;
      };

      const results = data.results;
      results.updated_at = Date.now();

      this.add(userID, results);
      this.setOnlineStatus(userID, results?.is_online)

    } finally {
      //this.loadingState.set(userID, false);
    }
  };

  public setOnlineStatus(userID: UserID, status: boolean) {
    useUserStore.getState()._setOnlineStatus(userID, status);
  };

  public add(userID: UserID, user: any) {
    useUserStore.getState()._add(userID, user);
  };

  public addMany(users: Map<number, UserProfile_T>) {
    useUserStore.getState()._addMany(users);
  };

  public addArray(id: number, items: UserProfile_T[]): void {

  };

  public remove(userID: UserID) {
    useUserStore.getState()._remove(userID);
  };

  public update(userID: UserID, data: Partial<any>) {
    useUserStore.getState()._update(userID, data);
  };

  public get(userID: UserID = 0): UserProfile_T {
    const user = useUserStore.getState().userProfiles[userID];
    return user;
  };
};

async function load(userID: UserID = 0) {
  await UsersManager.getInstance().load(userID);
};

export function useUsers(): Record<number, UserProfile_T> {
  const users = useUserStore((s) => s.userProfiles);
  useEffect(() => {
    //console.warn("useUsers");
    if (!users)
      UsersManager.getInstance().initLoading(0);
  }, [users]);
  return users;
};

export function useUserStatus(userID: UserID): boolean {
  const status = useUserStore(state => state.onlineStatus[userID]);
  useEffect(() => {
    //console.warn("useUserStatus");
  }, [userID, status]);
  return status;
};

export function useUser(userID: UserID): UserProfile_T {
  const user = useUserStore((s) => s.userProfiles[userID]);
  const lastUpdated = user?.updated_at;
  const loadingRef = useRef(false);
  useEffect(() => {
    const now = Date.now();
    const lastUpdatedTs = typeof lastUpdated === "number" ? lastUpdated : 0;
    if (!loadingRef.current && now - lastUpdatedTs > 3000){
      loadingRef.current = true;
      UsersManager.getInstance().load(userID).finally(()=>{
        loadingRef.current = false  
      })
    }
  }, [userID, lastUpdated]);
  return user;
};

const EMPTY_USER_OBJECT: UserProfile_T = {
  user_id: 0,
  first_name: "",
  last_name: "",
  username: "",
  created_at: "",
  bio: "",
  avatar_url: "",
  bg_img_url: "",
  followers: 0,
  followings: 0,
  is_following: false,
  posts: 0,
  followers_ids: [],
  followings_ids: [],
  is_online: false,
  updated_at: 0,
};

