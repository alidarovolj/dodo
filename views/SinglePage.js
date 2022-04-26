import React, { useState } from "react";
import {
  Text,
  Button,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function App({ route, navigation }) {
  const loadScene = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Text
              style={{
                shadowOffset: { width: 10, height: 10 },
                shadowColor: "black",
                shadowOpacity: 1,
                elevation: 3,
                backgroundColor: "white",
                padding: 10,
                borderRadius: "100%",
                position: "absolute",
                zIndex: 10,
                left: 10,
                top: 10,
              }}
              onPress={loadScene}
            >
              <FontAwesome
                style={{
                  fontSize: 20,
                }}
                name="chevron-down"
              />
            </Text>
            <Image
              style={{ width: null, minHeight: 350 }}
              source={{ uri: route.params.images[0] }}
            />
            <Text>{route.params.title}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
  },
});
