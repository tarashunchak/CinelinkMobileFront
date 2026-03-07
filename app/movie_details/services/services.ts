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