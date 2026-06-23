import { API_URL } from "@/api/API_CONFIG";
import { jwtHeaders } from "@/utils/utils";

export async function GetMovieDetails(movieID: number) {
  const response = await fetch(`${API_URL}/movies/${movieID}`, {
    headers: jwtHeaders(undefined)
  });
  const data = await response.json();
  //console.warn("MOVIE FROM WATCHLIST: ", data?.results)
  return data?.results;
}

export function GetMovieDirectors(credits: any[]) {
  const directors = credits?.filter(member => member.known_for_department === "Directing")
    ?.map(member => member.name);
  //if(directors?.length === 0) return 
  
  return directors;
}

export async function LoadMovieDetails(movieID: number) {
  const data = await GetMovieDetails(movieID);
  if (!data) return;
  data.directors = GetMovieDirectors(data?.credits?.crew);
  return data;
}

export function GetMovieYouTubeTrailerKey(videos: any) {
  return videos?.results?.find((video: any) => video?.site === "YouTube" && video?.type === "Trailer")?.key;
}

export async function GetMovieCredits(movieID: number) {
  const response = await fetch(`${API_URL}/movies/${movieID}/credits`, {
    headers: jwtHeaders(undefined)
  });
  const data = await response.json();
  return data?.results;
}