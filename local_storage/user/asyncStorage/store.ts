import { create } from "zustand";
import { User } from "./domain";
import { UserRepository } from "./repository";
import { TokenRepository } from "./repository";
import * as Notifications from "@/utils/notifications";
import { useState } from "react";
import { useChatStore } from "@/src/rt_client/managers/chats_manager";

type AuthState = {
  user: User | null;
  isHydrated: boolean;
  isAuthenticated: boolean;

  init: () => Promise<void>;
  setUser: (user: User) => Promise<void>;
  logIn: (user: User, token: string) => Promise<void>;
  logOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isHydrated: false,
  isAuthenticated: false,

  async init() {
    const [user, token] = await Promise.all([
      UserRepository.load(),
      TokenRepository.get(),
    ]);
    set({
      user,
      isAuthenticated: !!token,
      isHydrated: true,
    });

  },

  async setUser(user) {
    UserRepository.save(user);
    set({ user });
  },

  async logIn(user: User, token: string) {
    try {
      await Promise.all([
        UserRepository.save(user),
        TokenRepository.save(token),
      ]);
      set({
        user: user,
        isAuthenticated: true,
        isHydrated: true,
      });
    } finally {
      //await Notifications.requestUserPermission();
    }
  },

  async logOut() {
    await Promise.all([
      UserRepository.clear(),
      TokenRepository.clear(),
    ]);
    useChatStore.getState()._clear();
    set({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
    });
  },
}));