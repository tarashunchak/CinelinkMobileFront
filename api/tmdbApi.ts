import { API_URL } from "@/api/API_CONFIG";

export async function getMovieOfTheDay() {
  const response = await fetch(`${API_URL}/movie_of_the_day`);
  const data = await response.json();
  return data?.results;
}

export async function getPopularMovies() {
  const response = await fetch(`${API_URL}/movies/popular`);
  const data = await response.json();
  return data?.results;
}

export async function getMovieGenres() {
  const response = await fetch(`${API_URL}/movies/genres`);
  const data = await response.json();
  return data?.results;
}

export async function getMoviesByGenre(selectedGenre: number) {
  const response = await fetch(`${API_URL}/movies/genres/${selectedGenre}`);
  const data = await response.json();
  return data?.results;
}

export async function getDetailedMovieByID(movieID: number) {
  console.log("MovieID: ", movieID);
  const response = await fetch(`${API_URL}/movies/${movieID}`);
  const data = await response.json();
  console.log("getDetailedMovieBy_id called")
  return data?.results;
}

export async function getSimilarMovies(movieID: number) {
  const response = await fetch(`${API_URL}/movies/${movieID}/similar`);
  const data = await response.json();
  return data?.results;
}

export async function getFilmographyByPerson(personID: number) {
  const response = await fetch(`${API_URL}/person/movies?person_id=${personID}`);
  const data = await response.json();
  return data;
}

export async function getNowPlayingMovies() {
  const response = await fetch(`${API_URL}/movies/now_playing`);
  const data = await response.json();
  console.log("Maximum date: ", data?.results.dates?.maximum)
  return data;
}