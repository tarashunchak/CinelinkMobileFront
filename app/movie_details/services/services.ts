import { API_URL } from "@/api/API_CONFIG";

export async function GetMovieDetails(movieID: number) {
  const response = await fetch(`${API_URL}/movies/${movieID}`);
  const data = await response.json();
  return data?.results;
}

export function GetMovieDirectors(credits: any[]) {
  return credits?.filter(member => member.job === "Director")
    ?.map(member => member.name);
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
  const response = await fetch(`${API_URL}/movies/${movieID}/credits`);
  const data = await response.json();
  return data?.results;
}