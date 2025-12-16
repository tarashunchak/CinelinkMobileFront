import { StatusBar } from "expo-status-bar";
import React from "react";
import TabNavigator from "./navigation/tabNavigator";
//import LeafyNavigator from './navigation/navigator';

export default function App() {
  return (
    <>
      <StatusBar hidden={true} />
      <TabNavigator />
    </>
  );
}