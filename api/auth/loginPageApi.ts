import { API_URL } from "@/api/API_CONFIG";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { useNavigation } from "expo-router";
import { Alert } from "react-native";

export async function LoginRequest(login: string, password: string) {
  console.log("Trying to login")
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        login,
        password,
      })
    });

    const data = await res.json();
    console.log("DATA: ", data)

    if (data.status === 200) {
      console.log("SUCCESS LOGIN");
      if (data.results && data.results) {
        const user = data.results;
        useAuthStore.getState().logIn(user, '1234567890');
      }
      return
    }

    if (data.status === 403) {
      Alert.alert("Login failed", "Incorrect password, try again")
      return
    }

    if (data.status === 401) {
      Alert.alert("Login failed", "User not found, try again")
      //const navigator = useNavigation();
      //navigator.navigate("Registration");
      return
    }
  } catch {

  }
}