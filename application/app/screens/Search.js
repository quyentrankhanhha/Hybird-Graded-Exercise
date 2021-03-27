import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import Fuse from "fuse.js";

export default function Search() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState([]);
  const [result, setResult] = useState([]);
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
  const getSearch = async () => {
    try {
      const fuse = new Fuse(data, {
        keys: ["title", "description", "price", "location"]
      });
      const results = fuse.search(search);
      setResult(results);
    } catch (err) {
      console.log(err);
    }
  };
  const updateSearch = (item) => {
    setSearch(item);
    getSearch();
  };
  useEffect(() => {
    getData();
  });

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        keyExtractor={(item) => item.item._id}
        data={result}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{ uri: item.item.imagine }}
              style={styles.img}
            ></Image>
            <View style={{ flex: 1 }}>
              <Text>Title: {item.item.title}</Text>
              <Text>Description: {item.item.description}</Text>
              <Text>Category: {item.item.category}</Text>
              <Text>Price: {item.item.price}</Text>
              <Text>Location: {item.item.location}</Text>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdcb6e"
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
