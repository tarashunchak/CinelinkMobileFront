import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import TabNavigator from "../navigation/tabNavigator";
import AuthNavigator from "@/navigation/AuthNavigator";
//import LeafyNavigator from './navigation/navigator';

let CorrectLogin;

export default function App() {
  const [login, setLogin] = useState<boolean>(false);

  if (!login)
    return (
      <>
        <StatusBar hidden={true} />
        <TabNavigator />
      </>
    );
  else
    return (
      <>
        <StatusBar hidden={true} />
        <AuthNavigator />
      </>
    );
}