import { API_URL } from "@/api/API_CONFIG";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  directors: string[];
  release_date: string;
  providers: any;
  imdb_id: string; 
};

type SimilarMovies = {
  movies: Movie[];
};

type CacheEntity<T> = {
  data: T;
  expiresAt: any;
};

const TTL = 12000;
const similarMoviesCache = new Map<number, CacheEntity<SimilarMovies>>();

export async function getMovieOfTheDay() {
  const response = await fetch(`${API_URL}/movie_of_the_day`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

export async function getPopularMovies() {
  const response = await fetch(`${API_URL}/movies/popular`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

export async function getMovieGenres() {
  const response = await fetch(`${API_URL}/movies/genres`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

export async function getMoviesByGenre(selectedGenre: number) {
  const response = await fetch(`${API_URL}/movies/genres/${selectedGenre}`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

export async function getDetailedMovieByID(movieID: number) {
  const response = await fetch(`${API_URL}/movies/${movieID}`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

export async function getSimilarMovies(movieID: number) {
  const cache = similarMoviesCache.get(movieID);
  if(cache && cache.expiresAt > Date.now()) 
    return cache;

  const response = await fetch(`${API_URL}/movies/${movieID}/similar`);
  if (!response.ok)
    return;
  const data = await response.json();
  similarMoviesCache.set(
    movieID,
    data?.results,
  )
  return data?.results;
};

export async function getFilmographyByPerson(personID: number) {
  const response = await fetch(`${API_URL}/credits/${personID}`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

export async function getNowPlayingMovies() {
  const response = await fetch(`${API_URL}/movies/now_playing`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data;
}