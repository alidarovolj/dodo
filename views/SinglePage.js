import axios from "axios";
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
  const login = localStorage.getItem("loggedInLogin");
  const order = {
    title: route.params.title,
    price: route.params.price,
    options: [],
  };
  const price = route.params.price;
  var res = {
    goods: [order],
    user_login: login,
    price: price,
    status: false,
  };
  var result = null;
  var setItem = null;
  var finalPrice = null;
  async function sendOrder() {
    var prevZakaz = await axios.get("http://localhost:3000/orders");
    var prevZakazData = prevZakaz.data;
    var itemID = null;
    if (prevZakazData.length <= 0) {
      await axios.post("http://localhost:3000/orders", res);
      console.log("Отправлено");
    } else {
      prevZakazData.forEach((item) => {
        if (item.user_login == login && item.status === false) {
          item.goods.forEach(element => {
            finalPrice += element.price
          });
          setItem = {
            title: route.params.title,
            price: route.params.price,
            options: [],
          };
          item.price = finalPrice + setItem.price;
          item.goods.push(setItem);
          itemID = item.id;
          result = item;
        }
      });
      await axios.put("http://localhost:3000/orders/" + itemID, result);
    }
  }
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
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <Text style={{ fontSize: 24, marginBottom: 20 }}>
                {route.params.title}
              </Text>
              <Button onPress={sendOrder} title="Отправить заказ" />
            </View>
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
