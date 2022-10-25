import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppFonts from "./src/config/AppFonts";
import ScriptureScreen from "./src/screens/ScriptureScreen";
import ScriptureScreenV2 from "./src/screens/ScriptureScreenV2";

export default function App() {
  return <ScriptureScreen />;
}
