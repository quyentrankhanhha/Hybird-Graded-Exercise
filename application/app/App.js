import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./navigation/TabNavigator";
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <TabNavigator></TabNavigator>
      </NavigationContainer>
    );
  }
}

export default App;
