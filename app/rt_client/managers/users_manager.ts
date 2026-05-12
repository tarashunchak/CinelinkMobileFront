import { API_URL } from "@/api/API_CONFIG";
import { UserID } from "../models/models";
import { create } from "zustand";
import { EntinyManager } from "./base_class";
import { useEffect } from "react";
import {useShallow} from "zustand/react/shallow";

type User_T = {
  user_id: number;
  username: string;
  avatar_url: string;
  is_online: boolean;
};

interface UserState {
  users: Record<UserID, User_T>;
  onlineStatus: Record<UserID, boolean>;
  _setOnlineStatus: (userID: UserID, status: boolean) =>  void;
  _setManyOnlineStatus: (statuses: Map<UserID, boolean>) => void;
  _add: (userID: UserID, user: User_T) => void;
  _addMany: (users: Map<UserID, User_T>) => void;
  _remove: (userID: UserID) => void;
  _update: (userID: UserID, data: Partial<User_T>) => void;
};

const useUserStore = create<UserState>((set) => ({
  users: {},
  onlineStatus: {},
  _setOnlineStatus: (userID, status) => set((s) => ({
    onlineStatus: {...s.onlineStatus, [userID]: status}
  })),
  _setManyOnlineStatus: (statuses) => set((s) => ({
    onlineStatus: {...s.onlineStatus, ...Object.fromEntries(statuses)}
  })),
  _add: (userID, user) => set((s) => ({
    users: {...s.users, [userID]: user}
  })),
  _addMany: (newUsers) => set((s) => ({
    users: {...s.users, ...Object.fromEntries(newUsers)}
  })),
  _remove: (userID) => set((s)=>{
    const {[userID]: _, ...remainingUsers } = s.users;
    return {users: remainingUsers}
  }),
  _update: (userID, data) => set((s)=>({

  })),
}));

export class UsersManager extends EntinyManager<User_T> {
  private currUserID: number = 0;
  private static instance: UsersManager;

  public static getInstance(): UsersManager {
    if(!UsersManager.instance)
      UsersManager.instance = new UsersManager();
    return UsersManager.instance;
  };

  public init(userID: UserID){
    this.currUserID = userID;
    this.load(userID);
  };

  public async load(userID: UserID) {
    const resp = await fetch(`${API_URL}/users/init/${userID}`);
    const data = await resp.json();
    if(!resp.ok || data?.status !== 200){
      console.log("Users init err: ", resp);
      return;
    };

    const map = new Map();
    const statuses = new Map();

    data?.results?.forEach((user: User_T)=>{
      map.set(user.user_id, user);
      statuses.set(user.user_id, user.is_online);
    });

    useUserStore.getState()._addMany(map);
    useUserStore.getState()._setManyOnlineStatus(statuses);
  };

  public add(userID: UserID, user: any){
    useUserStore.getState()._add(userID, user);
  };

  public addMany(users: Map<number, User_T>){
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

  public get(userID: UserID = 0): any{
    const users = useUserStore(s => s.users[1]);
    return users;
  };
};

export function useUsers():any[] {
  const users = useUserStore(useShallow((s) => Object.values(s.users)));
  useEffect(()=>{}, [users?.length]);
  return users;
};

export function useUserStatus(userID: UserID): boolean {
  const status = useUserStore(state => state.onlineStatus[userID] ?? false);
  useEffect(() => {}, [userID, status]);
  return status;
};