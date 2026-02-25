import { create } from "zustand";
import { User } from "./domain";
import { UserRepository } from "./repository";
import { TokenRepository } from "./repository";
import { useState } from "react";

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
    await Promise.all([
      UserRepository.save(user),
      TokenRepository.save(token),
    ]);
    set({
      user: user,
      isAuthenticated: true,
      isHydrated: true,
    });
  },

  async logOut() {
    await Promise.all([
      UserRepository.clear(),
      TokenRepository.clear(),
    ]);
    set({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
    });
  },
}));