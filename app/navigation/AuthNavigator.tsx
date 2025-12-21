import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "../screens/Auth/LoginScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen1";
import CreatePasswordScreen from "../screens/Auth/CreatePasswordScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  <SafeAreaProvider style={{ flex: 1 }}>
    <StatusBar hidden={true} />
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordRecovery" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateNewPassword" component={CreatePasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  </SafeAreaProvider>
}