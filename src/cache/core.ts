class Item<T> {
  constructor(
    public data: T | null = null,
    public expiresAt: number = 0,
  ){

  };
};

class ItemCache<T, U> {
  public dataMap = new Map<U, Item<T>>();
  constructor(
    public ttl: number = 0
  ){

  };

  public CacheItem(keyValue: U, value: T){
    this.dataMap.set(keyValue, new Item<T>(
      value,
      Date.now() + this.ttl,
    ));
  };

  public GetCachedItem(keyValue: U): T {
    const data = this.dataMap.get(keyValue);
    if(Date data?.expiresAt < Date.now())
    return data?.data;
  }
};

