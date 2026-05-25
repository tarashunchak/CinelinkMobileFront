import React from "react";
import { Redirect } from "expo-router";

export default function Profile(){
  return <Redirect href="/(app)/profile?isFromTab=1" />
};