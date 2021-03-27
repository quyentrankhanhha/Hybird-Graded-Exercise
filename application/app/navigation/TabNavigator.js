import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// components
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import StackNavigator from "./StackNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [loggedIn, setLoggedIn] = useState("1");
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>

      {loggedIn !== "1" ? (
        <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
      ) : (
        <Tab.Screen
          name="Login"
          component={StackNavigator}
          loggedIn={loggedIn}
        ></Tab.Screen>
      )}
    </Tab.Navigator>
  );
}
