import React, { useState } from 'react'
import axios from 'axios'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image
} from "react-native";

export default function App() {
  var [allProducts, getProduct] = useState(null);
  async function getAllProducts() {
    let res = await axios.get('http://localhost:3000/goods');
    let newProducts = res.data;
    getProduct(newProducts);
    console.log(allProducts)
  }
  getAllProducts();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: 15,
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" ,alignItems: "center" }}>
              <Text style={{ fontSize: 22, fontWeight: "600", marginRight: 7 }}>Алматы</Text>
              <FontAwesome name="chevron-down" />
            </View>
            <FontAwesome style={{ fontSize: 20 }} name="search" />
          </View>
          <View style={{ padding: 15, width: '100%' }}>
            <View style={{ backgroundColor: "#f5f5f8", padding: 5, borderRadius: 10, display: "flex", flexDirection: "row" }}>
              <Text style={{ width: "50%", textAlign: "center", paddingTop: 5, paddingBottom: 5, fontSize: 19, fontWeight: "500", backgroundColor: "#fff" }}>На доставку</Text>
              <Text style={{ width: "50%", textAlign: "center", paddingTop: 5, paddingBottom: 5, fontSize: 19, fontWeight: "500" }}>В зале</Text>
            </View>
          </View>
          <FlatList style={{ width: "100%" }} data={allProducts} renderItem={({item}) => (
            <View style={{ width: "100%", padding: 15, borderBottom: "1px solid rgb(245, 245, 248)", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <Image style={{ width: "40%" }} source={{ uri:item.images[0] }} />
              <View style={{ width: "60%", paddingLeft: 5 }}>
                <Text style={{ fontWeight: '600', marginBottom: 8 }}>{item.title}</Text>
                <Text>{item.desc}</Text>
                <Text style={{ backgroundColor: "#ffefe5", color: "#de813f", width: "fit-content", paddingTop: 5,paddingBottom: 5,paddingRight: 10,paddingLeft: 10, fontSize: 18, borderRadius: 15, marginTop: 10 }}>от {item.price}т</Text>
              </View>
            </View>
          )} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
