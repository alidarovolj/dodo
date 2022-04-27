import React, { useState, useEffect } from "react";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Image,
  TouchableHighlight,
  Modal,
  TextInput,
} from "react-native";

export default function Main({ navigation }) {
  var [allProducts, getProduct] = useState(null);
  var [fullLogin, getLogin] = useState("");
  var [fullPhone, getPhone] = useState("");
  const cookieInfo = localStorage.getItem("loggedIn");
  var hello = null;
  var [getCurrentUser, setCurrentUser] = useState("");
  var [fullPassword, getPassword] = useState("");
  var [loginLogin, getLoginName] = useState("");
  var [loginPassword, getPasswordName] = useState("");
  var [allUsers, getUser] = useState(null);
  var [modalVisible, setModalVisible] = useState(false);
  function getProducts() {
    useEffect(() => {
      async function getAllProducts() {
        let res = await axios.get("http://localhost:3000/goods");
        let newProducts = res.data;
        getProduct(newProducts);
      }
      getAllProducts();
    }, []);
  }
  function getUsers() {
    useEffect(() => {
      async function getAllUsers() {
        let res = await axios.get("http://localhost:3000/users");
        let newUsers = res.data;
        getUser(newUsers);
      }
      getAllUsers();
    }, []);
  }
  async function sendUser() {
    await axios.post("http://localhost:3000/users", {
      login: fullLogin,
      phone: fullPhone,
      password: fullPassword,
    });
  }
  function login() {
    for (let i = 0; i <= allUsers.length; i++) {
      if (
        allUsers[i].login === loginLogin &&
        allUsers[i].password === loginPassword
      ) {
        localStorage.setItem("loggedIn", allUsers[i].login);
      } else {
        console.log("Данные не совпадают");
      }
    }
  }

  function someFunction() {
    allUsers?.forEach((element) => {
      if (element.login == cookieInfo) {
        setCurrentUser(element)
      }
    });
  }
  getProducts();
  getUsers();
  someFunction();
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <ScrollView>
              <View
                style={{
                  minHeight: "63%",
                  padding: 10,
                  flex: 1,
                  backgroundColor: "rgb(243, 243, 247)",
                }}
              >
                <Text
                  style={{
                    backgroundColor: "white",
                    width: "fit-content",
                    padding: 10,
                    borderRadius: "100%",
                  }}
                  onPress={() => setModalVisible((modalVisible = false))}
                >
                  <FontAwesome
                    style={{
                      fontSize: 20,
                    }}
                    name="chevron-down"
                  />
                </Text>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    Регистрация
                  </Text>
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Логин
                  </Text>
                  <TextInput
                    onChangeText={(e) => getLogin((fullLogin = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                    placeholder="Укажите логин"
                  />
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Телефон
                  </Text>
                  <TextInput
                    onChangeText={(e) => getPhone((fullPhone = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                    placeholder="Укажите телефон"
                  />
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Пароль
                  </Text>
                  <TextInput
                    onChangeText={(e) => getPassword((fullPassword = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 20,
                    }}
                    placeholder="Укажите пароль"
                  />
                  <Button
                    title="Отправить"
                    onPress={sendUser}
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(255, 105, 0)",
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  flex: 1,
                  backgroundColor: "rgb(243, 243, 247)",
                }}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 20,
                    }}
                  >
                    Войти
                  </Text>
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Логин
                  </Text>
                  <TextInput
                    onChangeText={(e) => getLoginName((loginLogin = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 15,
                    }}
                    placeholder="Укажите логин"
                  />
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, marginBottom: 10 }}
                  >
                    Пароль
                  </Text>
                  <TextInput
                    onChangeText={(e) => getPasswordName((loginPassword = e))}
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      borderRadius: 8,
                      marginBottom: 20,
                    }}
                    placeholder="Укажите пароль"
                  />
                  <Button
                    title="Отправить"
                    onPress={login}
                    style={{
                      width: "100%",
                      backgroundColor: "rgb(255, 105, 0)",
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </Modal>
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "600", marginRight: 7 }}>
                Алматы
              </Text>
              <FontAwesome name="chevron-down" />
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <FontAwesome style={{ fontSize: 20 }} name="search" />
              <View>
                <FontAwesome
                  onPress={() => setModalVisible((modalVisible = true))}
                  style={{ fontSize: 20, marginLeft: 10 }}
                  name="user"
                />
                <Text>{getCurrentUser.login}</Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 15, width: "100%" }}>
            <View
              style={{
                backgroundColor: "#f5f5f8",
                padding: 5,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  width: "50%",
                  textAlign: "center",
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 19,
                  fontWeight: "500",
                  backgroundColor: "#fff",
                }}
              >
                На доставку
              </Text>
              <Text
                style={{
                  width: "50%",
                  textAlign: "center",
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontSize: 19,
                  fontWeight: "500",
                }}
              >
                В зале
              </Text>
            </View>
          </View>
          <FlatList
            style={{ width: "100%" }}
            data={allProducts}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => navigation.navigate("SinglePage", item)}
              >
                <View
                  style={{
                    width: "100%",
                    padding: 15,
                    borderBottom: "1px solid rgb(245, 245, 248)",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Image
                    style={{ width: "40%" }}
                    source={{ uri: item.images[0] }}
                  />
                  <View style={{ width: "60%", paddingLeft: 5 }}>
                    <Text style={{ fontWeight: "600", marginBottom: 8 }}>
                      {item.title}
                    </Text>
                    <Text>{item.desc}</Text>
                    <Text
                      style={{
                        backgroundColor: "#ffefe5",
                        color: "#de813f",
                        width: "fit-content",
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingRight: 10,
                        paddingLeft: 10,
                        fontSize: 18,
                        borderRadius: 15,
                        marginTop: 10,
                      }}
                    >
                      от {item.price}т
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          />
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
