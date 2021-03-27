import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    isAuthenticated: false,
    token: ""
  };

  _login = async () => {
    axios("https://graded-exercises.herokuapp.com/login", {
      method: "POST",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(async (res) => {
        if (res.data.message === "Logged in !") {
          this.setState({ token: res.data.token });
          this.setState({ isAuthenticated: true });
          this.setState({ loggedIn: true });
          alert("Login successful!");
          setTimeout(this.props.navigation.navigate("Home"), 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        ></TextInput>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={this._login}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 6 }}></View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={styles.btnTxt}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;

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
