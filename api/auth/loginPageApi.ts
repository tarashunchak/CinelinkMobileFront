import { API_URL } from "@/api/API_CONFIG";
import { CURRENT_USER } from "@/api/currentUser";
import { useNavigation } from "expo-router";

export async function LoginRequest(email: string, password: string) {
  const navigation = useNavigation();

  console.log("Trying to login")
  try {
    const res = await fetch(`${API_URL}/auth/login/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      })
    });

    const data = await res.json();

    if (data.code === 200) {
      if (data.data && data.data.user) {
        const user = data.data.user;
        CURRENT_USER.firstName = user.firstName;
        CURRENT_USER.lastName = user.lastName;
        CURRENT_USER.username = user.username;
        CURRENT_USER.UID = user.userID;
      }
      navigation.navigate("HomePageScreen");
    }

    if (data.code === 403) {
      navigation.navigate("Error500Screen");
    }
  } catch { }
}