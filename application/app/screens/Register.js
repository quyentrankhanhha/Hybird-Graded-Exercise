import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native";
import axios from "axios";

class Register extends Component {
  state = {
    newEmail: "",
    newPassword: "",
    newUsername: ""
  };
  _register = async () => {
    axios("https://graded-exercises.herokuapp.com/register", {
      method: "POST",
      data: {
        username: this.state.newUsername,
        email: this.state.newEmail,
        password: this.state.newPassword
      }
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Register successful!");
          setTimeout(this.props.navigation.navigate("Login"), 3000);
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
          placeholder="Username"
          onChangeText={(newUsername) => this.setState({ newUsername })}
          value={this.state.newUsername}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(newEmail) => this.setState({ newEmail })}
          value={this.state.newEmail}
          autoCapitalize="none"
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(newPassword) => this.setState({ newPassword })}
          value={this.state.newPassword}
        ></TextInput>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.userBtn} onPress={this._register}>
            <Text style={styles.btnTxt}>Register</Text>
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
