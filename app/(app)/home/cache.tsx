import { GetHomeMovies } from "@/api/home/home";
import { getMovieGenres, getMovieOfTheDay } from "@/api/tmdbApi";
import { Image } from "expo-image";
import { create } from "zustand";

interface HomePageState {
  movie_of_the_day: any;
  movies: {
    now_playing: any[];
    popular: any[];
  };
  genres: any[];
  setMovieOfTheDay: (movie: any)=>void;
  setMovies: (movies: any)=>void;
  setGenres: (genres: any)=>void;
};

export const useHomeStore = create<HomePageState>((set)=>({
  movie_of_the_day: {},
  movies: {
    now_playing: [],
    popular: [],
  },
  genres: [],
  setMovieOfTheDay: (movie) => set({movie_of_the_day: movie}),
  setMovies: (movies) => set({movies: movies}),
  setGenres: (genres: any) => set({genres: genres}),
}));

interface HomeMovies {
  popular: any[];
  now_playing: any[];
};

type CacheEntry<T> = {
  data?: T;
  expiresAt?: number;
}

const homeMoviesTTL = 60000;
let cachedHomeMovies: CacheEntry<HomeMovies> = {};

export async function LoadGenresCached(){
  if(useHomeStore.getState().genres.length)
    return;
  const data = await getMovieGenres();
  if(data) useHomeStore.getState().setGenres(data);
};

export async function LoadHomeCached() {
  /*if (cachedHomeMovies && cachedHomeMovies.data && cachedHomeMovies.expiresAt > Date.now()) {
    console.log("Cached home: ", cachedHomeMovies);
    return cachedHomeMovies?.data;
  }*/

  if(useHomeStore.getState().movies.popular.length  && useHomeStore.getState().movies.now_playing.length)
    return;

  const data = await GetHomeMovies();
  useHomeStore.getState().setMovies(data);

  /*cachedHomeMovies = {
    data,
    expiresAt: Date.now() + homeMoviesTTL,
  };

  return data;*/
};

interface MovieOfTheDay {

};

const moviesOfTheDayTTL = 60000;
let cachedMovieOfTheDay: CacheEntry<MovieOfTheDay> = {};

export async function GetMovieOfTheDayCache() {
  if (cachedMovieOfTheDay && cachedMovieOfTheDay.data && cachedMovieOfTheDay.expiresAt > Date.now()) {
    console.log("Cached movie of the day: ", cachedMovieOfTheDay);
    return cachedMovieOfTheDay?.data;
  }

  const data = await getMovieOfTheDay();

  await Image.prefetch(`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`)

  cachedMovieOfTheDay = {
    data,
    expiresAt: Date.now() + moviesOfTheDayTTL,
  };

  return data;
};