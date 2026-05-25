import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@/app/(auth)/login";
import ForgotPasswordScreen from "@/app/(auth)/ForgotPasswordScreen1";
import CreatePasswordScreen from "@/app/(auth)/CreatePasswordScreen";
import React from "react";
import RegistrationScreen from "@/app/(auth)/registration";

const Stack = createNativeStackNavigator();

export default function AuthNavigatorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PasswordRecovery" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CreateNewPassword" component={CreatePasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};