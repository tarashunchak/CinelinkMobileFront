import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "@/app/auth/LoginScreen";
import ForgotPasswordScreen from "@/app/auth/ForgotPasswordScreen1";
import CreatePasswordScreen from "@/app/auth/CreatePasswordScreen";
import React from "react";
import RegistrationScreen from "@/app/auth/RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigatorStack() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar hidden={true} />
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PasswordRecovery" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateNewPassword" component={CreatePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};