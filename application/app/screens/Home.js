import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image
} from "react-native";
import axios from "axios";

export default function Home(props) {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const dataRes = await axios.get(
        "https://graded-exercises.herokuapp.com/items"
      );
      const dataItems = dataRes.data;
      setData(dataItems);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  });
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imagine }} style={styles.img}></Image>
            <View style={{ flex: 1 }}>
              <Text>Title: {item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Location: {item.location}</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb6e",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    margin: 20
  },
  img: {
    width: 100,
    height: 100
  }
});
