import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// components
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator(props) {
  const [loggedIn, setLoggedIn] = useState("");
  const _loadData = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");
      setLoggedIn(loggedIn);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    _loadData();
  });

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
      {loggedIn === "1" ? (
        <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
      ) : (
        <Tab.Screen
          name="Login"
          component={StackNavigator}
          email={props.email}
          password={props.password}
        ></Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
