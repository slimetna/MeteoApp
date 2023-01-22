import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";

const API_URL = (city: any) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=04053c4c86d3f32ca43eaeb865e1c17c&lang=en&units=metric`;

export default function Search({ setData }: any) {
  const [search, setSearch]: any = useState();

  const handleSearch = async () => {
    try {
      const response: any = await axios.get(API_URL(search));
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ width: "100%", alignItems: "center" }}>
      <TextInput
        style={styles.Search}
        value={search}
        placeholder="Search"
        onChange={(e: any) => setSearch(e.nativeEvent.text)}
        onSubmitEditing={() => handleSearch()}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Search: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 10,
    marginTop: 75,
    textAlign: "center",
    underlineColorAndroid: "transparent",
  },
});
