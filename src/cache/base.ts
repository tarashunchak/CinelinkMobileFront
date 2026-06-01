export type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};