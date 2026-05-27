import React from "react";
import { Stack } from "expo-router";
import AuthBackground from "@/src/components/ui/authBackground";

export default function AuthLayout(){
  return (
    <AuthBackground>
        <Stack screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle:{backgroundColor: "transparent"}
        }}>
          <Stack.Screen name="login"/>
          <Stack.Screen name="registration"/>
        </Stack>
    </AuthBackground>
  );
};
