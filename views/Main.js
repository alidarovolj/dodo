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
  var [allOrders, getOrder] = useState(null);
  var [fullLogin, getLogin] = useState("");
  var [fullPhone, getPhone] = useState("");
  const cookieInfoLogin = localStorage.getItem("loggedInLogin");
  const cookieInfoPhone = localStorage.getItem("loggedInPhone");
  const cookieInfoPassword = localStorage.getItem("loggedInPassword");
  var [currentOrder, getCurrentOrder] = useState("");
  // var [getCurrentUser, setCurrentUser] = useState([]);
  var [fullPassword, getPassword] = useState("");
  var [loginLogin, getLoginName] = useState("");
  var [loginPassword, getPasswordName] = useState("");
  var [allUsers, getUser] = useState("");
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
  function getOrders() {
    useEffect(() => {
      async function getAllOrders() {
        let res = await axios.get("http://localhost:3000/orders");
        let newOrders = res.data;
        newOrders.forEach(element => {
          if(element.user_login == cookieInfoLogin && element.status == false) {
            getCurrentOrder(currentOrder = element);
          }
        });
        getOrder(allOrders = newOrders);
      }
      getAllOrders();
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
    allUsers?.forEach((item) => {
      if (item.login === loginLogin && item.password === loginPassword) {
        localStorage.setItem("loggedInLogin", item.login);
        localStorage.setItem("loggedInPhone", item.phone);
        localStorage.setItem("loggedInPassword", item.password);
      } else {
        console.log("Данные не совпадают");
      }
    });
  }
  // function setFunc() {
  //   useEffect(() => {
  //     async function setFunction() {
  //       allUsers?.forEach((element) => {
  //         if (element.login == cookieInfo) {
  //           console.log("jhdkalsjdlksa");
  //         } else {
  //           console.log("nothing");
  //         }
  //       });
  //     }
  //     setFunction()
  //   }, []);
  // }
  getProducts();
  getUsers();
  getOrders()
  // setFunc();
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome style={{ fontSize: 20 }} name="search" />
              <View style={{ textAlign: "center", marginLeft: 10 }}>
                <FontAwesome
                  onPress={() => setModalVisible((modalVisible = true))}
                  style={{ fontSize: 20 }}
                  name="user"
                />
                <Text>{cookieInfoLogin}</Text>
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
      <View
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          mixBlendMode: "luminosity",
          paddingTop: 10,
          paddingBottom: 10,
          backgroundOpacity: 0,
        }}
      >
        <View style={{ textAlign: "center", width: "25%" }}>
          <FontAwesome
            style={{ fontSize: 20, marginBottom: 5 }}
            name="fa-pizza-slice"
          />
          <Text style={{ fontSize: 12 }}>Меню</Text>
        </View>
        <View style={{ textAlign: "center", width: "25%" }}>
          <FontAwesome style={{ fontSize: 20, marginBottom: 5 }} name="user" />
          <Text style={{ fontSize: 12 }}>Профиль</Text>
        </View>
        <View style={{ textAlign: "center", width: "25%" }}>
          <FontAwesome style={{ fontSize: 20, marginBottom: 5 }} name="map" />
          <Text style={{ fontSize: 12 }}>Контакты</Text>
        </View>
        <View style={{ textAlign: "center", width: "25%" }}>
          <View>
            <FontAwesome
              style={{ fontSize: 20, marginBottom: 5 }}
              name="basket"
            />
            <Text style={{ color: "red" }}>
              { currentOrder.price }
            </Text>
          </View>
          <Text style={{ fontSize: 12 }}>Корзина</Text>
        </View>
      </View>
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
