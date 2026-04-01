import { API_URL } from "@/api/API_CONFIG";
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { useNavigation } from "expo-router";
import { Alert, ToastAndroid } from "react-native";

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
      if (data.results) {
        const user = data.results;
        useAuthStore.getState().logIn(user, user.jwt);
        console.log(`SUCCESS LOGIN: username{${user.username}} token{${user.jwt}}`);
      }
      return
    }

    if (data.status === 403) {
      ToastAndroid.show("Login failed\n Incorrect username or password", ToastAndroid.SHORT);
      return
    }

    if (data.status === 401) {
      ToastAndroid.show("Login failed\n User not found", ToastAndroid.SHORT);
      //Alert.alert("Login failed", "User not found, try again")
      //const navigator = useNavigation();
      //navigator.navigate("Registration");
      return
    }
  } catch {

  }
}