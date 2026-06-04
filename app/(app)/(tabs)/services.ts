import { API_URL } from "@/api/API_CONFIG";
import { jwtHeaders } from "@/utils/utils";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";

export async function GetSocial() {
  const response = await fetch(`${API_URL}/social`,
    {
      method: "GET",
      headers: jwtHeaders(undefined)
    }
  );
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  console.warn("Social data: ", data)
  return data ? data?.results : null;
};