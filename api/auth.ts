import { API_URL } from "./API_CONFIG"
import { useAuthStore } from "@/local_storage/user/asyncStorage/store";
import { ToastAndroid } from "react-native";

interface RegistrationProps {
  username: string;
  email: string;
  password: string;
};

interface LoginProps {
  username: string;
  password: string;
};

export async function RegistrationRequest(props: RegistrationProps): Promise<number> {
  if(!props || props?.username?.length === 0 || props?.email?.length === 0 || props?.password?.length === 0)
    return 0;
  const response = await fetch(`${API_URL}/registration`,
    {
      method: "POST",
      body: JSON.stringify(props),
    }
  );
  const data = await JSON.parse(await response.text());
  if (response.ok)
    return data?.results;
  return 0;
};

export async function LoginRequest(props: LoginProps): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/login`,
      {
        method: "POST",
        body: JSON.stringify(props),
      }
    );

    const data = await response.json();
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