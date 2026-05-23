import { LoadMovieDetails } from "./services/services";

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const movieCache = new Map<number, CacheEntry<any>>();
const TTL = 12000;

export async function GetMovieDetailsCached(movieID: number){
  const cached = movieCache.get(movieID);

  if(cached && cached.expiresAt > Date.now()) {
    console.warn("Get movie details from cache: ", movieID);
    return cached.data;
  };

  const data = await LoadMovieDetails(movieID);
  const backdropPath = `https://image.tmdb.org/t/p/w500${data?.images?.backdrops[data?.images?.backdrops?.length - 1]?.file_path}`;

  const formattedData = {
        movie: { ...data, ...{ credits: {} }},
        credits: data?.credits,
        backdropPath,
      };

  if(formattedData) {
    console.warn("Get movie details from api: ", movieID);
    movieCache.set(movieID, {
      data: formattedData,
      expiresAt: Date.now() + TTL,
    })
  };

  return formattedData;
};