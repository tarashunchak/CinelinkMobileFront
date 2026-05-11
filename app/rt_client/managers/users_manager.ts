import { API_URL } from "@/api/API_CONFIG";
import { UserID } from "../models/models";
import { create } from "zustand";
import { EntinyManager } from "./base_class";

type User_T = {
  user_id: number;
  username: string;
  avatar_url: string;
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
    onlineStatus: {...s.onlineStatus, ...statuses}
  })),
  _add: (userID, user) => set((s) => ({
    users: {...s.users, [userID]: user}
  })),
  _addMany: (newUsers) => set((s) => ({
    users: {...s.users, ...newUsers}
  })),
  _remove: (userID) => set((s)=>{
    const {[userID]: _, ...remainingUsers } = s.users;
    return {users: remainingUsers}
  }),
  _update: (userID, data) => set((s)=>({

  })),
}));

export class UsersManager extends EntinyManager<User_T> {
  public async load(userID: UserID) {
    const resp = await fetch(`${API_URL}/load-users/${userID}`);
    const data = await resp.json();
    if(!resp.ok || data?.status !== 200)
      return;

    useUserStore.getState()._addMany(data?.results);
  };

  public add(userID: UserID, user: any){
    useUserStore.getState()._add(userID, user);
  };

  public addMany(users: Map<number, User_T>){
    useUserStore.getState()._addMany(users);
  };

  public remove(userID: UserID) {
    useUserStore.getState()._remove(userID);
  };

  public update(userID: UserID, data: Partial<any>) {
    useUserStore.getState()._update(userID, data);
  };
};