import React from "react";
import { StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb6e",
    alignItems: "center",
    justifyContent: "center"
  }
});
