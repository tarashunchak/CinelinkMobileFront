import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "./domain";
import * as SecureStore from "expo-secure-store";

const USER_KEY = 'user_profile';
const ACCCESS_TOKEN_KEY = "access_token";

export const UserRepository = {
  async load(): Promise<User | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    };
  },

  async save(user: User): Promise<void> {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(USER_KEY);
  }
};

export const TokenRepository = {
  async get(): Promise<string | null> {
    return SecureStore.getItemAsync(ACCCESS_TOKEN_KEY);
  },

  async save(token: string): Promise<void> {
    await SecureStore.setItemAsync(ACCCESS_TOKEN_KEY, token);
  },

  async clear(): Promise<void> {
    SecureStore.deleteItemAsync(ACCCESS_TOKEN_KEY);
  }
};