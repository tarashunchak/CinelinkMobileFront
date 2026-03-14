import { API_URL } from "@/api/API_CONFIG";

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
  const response = await fetch(`${API_URL}/movies/${movieID}/similar`);
  if (!response.ok)
    return;
  const data = await response.json();
  return data?.results;
}

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