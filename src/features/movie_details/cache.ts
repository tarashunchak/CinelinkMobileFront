import { Image } from "expo-image";
import { LoadMovieDetails } from "./services/services";

type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const movieCache = new Map<number, CacheEntry<any>>();
const TTL = 60 * 1000 * 5;

export async function GetMovieDetailsCached(movieID: number){
  const cached = movieCache.get(movieID);
  //console.warn("Cached movie: ", cached);

  if(cached && cached.expiresAt > Date.now()) {
    //console.warn("Get movie details from cache: ", movieID);
    await Image.prefetch(`https://image.tmdb.org/t/p/w500${cached.data.backdropPath}`);
    return cached.data;
  };

  const data = await LoadMovieDetails(movieID);
  let backdropPath: string = "";
  
  if (data?.images?.backdrops?.length !== 0)
    backdropPath = `https://image.tmdb.org/t/p/w500${data?.images?.backdrops?.[data?.images?.backdrops?.length - 1]?.file_path}`;
  else
    backdropPath = `https://image.tmdb.org/t/p/w500${data?.poster_path}`;

  const formattedData = {
        movie: { ...data },
        credits: data?.credits,
        backdropPath,
      };

  if(formattedData) {
    //console.warn("Get movie details from api: ", movieID);
    movieCache.set(movieID, {
      data: formattedData,
      expiresAt: Date.now() + TTL,
    })
  };

  return formattedData;
};

export async function GetSimilarMoviesCached(movieID: number){

};

async function CacheSimilarMovies(){

};