import {
  StyleSheet,
  Appearance,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";
import Forecasts from "./components/Forecasts";
import Search from "./components/Search";

const API_URL = (lat: string, lon: string) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=04053c4c86d3f32ca43eaeb865e1c17c&lang=en&units=metric`;

export default function App() {
  const [data, setData]: any = useState(null);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener(({ colorScheme }) => {
    setTheme(colorScheme);
  });

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("You can't use this app without location permission.");
        return;
      }
      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      getWeather(userLocation);
    };
    getPermission();
  }, []);

  const getWeather = async (location: any) => {
    try {
      const response: any = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Search setData={setData} />
      <CurrentWeather data={data} />
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
