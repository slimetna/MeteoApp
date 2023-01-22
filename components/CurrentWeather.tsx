import { StyleSheet, Text, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns";

const getIcon = (icon: string) =>
  `http://openweathermap.org/img/wn/${icon}@4x.png`;

export default function CurrentWeather({ data }: any) {
  const [weather, setWeather]: any = useState(null);

  useEffect(() => {
    const weather = data?.list?.filter((forecast: any) => {
      const today = new Date().getTime() + Math.abs(data.city.timezone * 1000);
      const forecastDate = new Date(forecast.dt * 1000);
      return isSameDay(today, forecastDate);
    });
    setWeather(weather[0]);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{data?.city?.name}</Text>
      <Text style={styles.today}> Today </Text>
      <Image
        source={{ uri: getIcon(weather?.weather[0]?.icon) }}
        style={{ width: 150, height: 150, margin: 20 }}
      />
      <Text style={styles.temp}> {Math.round(weather?.main?.temp)}°C </Text>
      <Text style={styles.description}>
        {" "}
        {weather?.weather[0]?.description.toUpperCase()}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: "center",
    height: "52.5%",
  },
  city: {
    color: "#fff",
    fontSize: 35,
    fontWeight: "bold",
  },
  today: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "300",
  },
  temp: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "bold",
  },
  description: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "300",
  },
});
