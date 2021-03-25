import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";

class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder="Name"></TextInput>
        <TextInput style={styles.input} placeholder="Email"></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onPress={() => alert("Login Works")}
        ></TextInput>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.btnTxt}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 6 }}></View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb6e",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: "90%",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "white"
  },
  userBtn: {
    backgroundColor: "#fab1a0",
    padding: 15,
    width: 200
  },
  btnTxt: {
    textAlign: "center"
  }
});
