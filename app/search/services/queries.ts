import { API_URL } from "@/api/API_CONFIG";

export async function GetQueryResult(query: string) {
  const response = await fetch(`${API_URL}/search/${query}`);
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : null;
  return data ? data?.results : null;
}

export async function SearchUser(query: string) {
  const response = await fetch(`${API_URL}/search/users/${query}`);
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : null;
  return data ? data?.results : null;
}

export async function SearchPerson(query: string) {
  const response = await fetch(`${API_URL}/search/persons/${query}`);
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : null;
  return data ? data?.results : null;
}

export async function SearchWatchlist(query: string) {

  const response = await fetch(`${API_URL}/search/watchlists/${query}`);
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : null;
  return data ? data?.results : null;
}

export async function SearchMovie(query: string) {
  const response = await fetch(`${API_URL}/search/movies/${query}`);
  if (!response.ok)
    return;
  const text = await response.text()
  const data = text ? JSON.parse(text) : null;
  return data ? data?.results : null;
}