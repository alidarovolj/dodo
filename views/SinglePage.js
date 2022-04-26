import React, { useState } from "react";
import { Text, Button, View } from "react-native";

export default function App({ route, navigation }) {
  const loadScene = () => {
    navigation.goBack();
  };
  return (
    <View>
      <Button onPress={loadScene} />
      <Text>{route.params.title}</Text>
    </View>
  );
}
