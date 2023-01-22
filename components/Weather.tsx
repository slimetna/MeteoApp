import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const getIcon = (icon: string) =>
  `http://openweathermap.org/img/wn/${icon}@4x.png`;

export default function Weather({ forecast }: any) {
  return (
    <View style={styles.container}>
      <Text>{forecast.hour}h00</Text>
      <Image source={{ uri: getIcon(forecast?.icon) }} style={styles.image} />
      <Text>{forecast.temp}°C</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262626",
    height: 150,
    width: 100,
    paddingVertical: 5,
    marginHorizontal: 2.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});
