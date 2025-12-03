import { API_URL } from "@/api/API_CONFIG";

export async function getPopularMovies() {
  const response = await fetch(`${API_URL}/movie/popular`);
  const data = await response.json();
  return data;
}

export async function getMovieGenres() {
  const response = await fetch(`${API_URL}/movie/genres`);
  const data = await response.json();
  return data;
}

export async function getMoviesByGenre(selectedGenre: number) {
  const response = await fetch(`${API_URL}/movie/by-genre?genre=${selectedGenre}`);
  const data = await response.json();
  return data;
}

export async function getDetailedMovieByID(movieID: number) {
  console.log("MovieID: ", movieID);
  const response = await fetch(`${API_URL}/movie/details?movieID=${movieID}`);
  const data = await response.json();
  console.log("getDetailedMovieByID called")
  return data;
}

export async function getSimilarMovies(movieID: number) {
  const response = await fetch(`${API_URL}/movie/similar?movieID=${movieID}`);
  const data = await response.json();
  return data;
}

export async function getFilmographyByPerson(personID: number) {
  const response = await fetch(`${API_URL}/person/movies?personID=${personID}`);
  const data = await response.json();
  return data;
}

export async function getNowPlayingMovies() {
  const response = await fetch(`${API_URL}/movie/now-playing`);
  const data = await response.json();
  console.log("Maximum date: ", data?.dates?.maximum)
  return data;
}