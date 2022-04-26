import React, { useState } from "react";
import MainStack from "./navigate";
import { StyleSheet } from "react-native";

export default function App() {
  return <MainStack />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
