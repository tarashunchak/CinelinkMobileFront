import { API_URL } from "@/api/API_CONFIG";
import { jwtHeaders } from "@/utils/utils";

export async function GetQueryResult(query: string) {
  const response = await fetch(`${API_URL}/search/${query}`, {
    headers: jwtHeaders(undefined)
  });
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : undefined;
  return data ? data?.results : undefined;
}

export async function SearchUser(query: string) {
  const response = await fetch(`${API_URL}/search/users/${query}`, {
    headers: jwtHeaders(undefined)
  });
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : undefined;
  return data ? data?.results : undefined;
}

export async function SearchPerson(query: string) {
  const response = await fetch(`${API_URL}/search/persons/${query}`, {
    headers: jwtHeaders(undefined)
  });
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : undefined;
  return data ? data?.results : undefined;
}

export async function SearchWatchlist(query: string) {

  const response = await fetch(`${API_URL}/search/watchlists/${query}`, {
    headers: jwtHeaders(undefined)
  });
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : undefined;
  return data ? data?.results : undefined;
}

export async function SearchMovie(query: string) {
  const response = await fetch(`${API_URL}/search/movies/${query}`, {
    headers: jwtHeaders(undefined)
  });
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : undefined;
  return data ? data?.results : undefined;
}