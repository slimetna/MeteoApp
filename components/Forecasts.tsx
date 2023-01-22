import { StyleSheet, Text, ScrollView, View } from "react-native";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import Weather from "./Weather";

export default function Forecasts({ data }: any) {
  const [forecasts, setForecasts]: any = useState([]);

  useEffect(() => {
    const forecastsData = data?.list?.map((forecast: any) => {
      const dt = new Date(forecast?.dt * 1000);
      return {
        date: dt,
        hour: dt.getHours(),
        temp: Math.round(forecast?.main.temp),
        icon: forecast?.weather[0].icon,
        name: format(dt, "EEEE", { locale: enUS }),
      };
    });
    let newForecastData = forecastsData
      ?.map((forecast: any) => {
        return forecast?.name;
      })
      .filter((day: any, index: any, self: any) => {
        return self.indexOf(day) === index;
      })
      .map((day: any) => {
        return {
          day,
          data: forecastsData?.filter(
            (forecast: any) => forecast?.name === day
          ),
        };
      });
    setForecasts(newForecastData);
  }, [data]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {forecasts?.map((forecast: any, key: any) => (
        <View key={key}>
          <Text style={styles.day}> {forecast?.day.toUpperCase()} </Text>
          <View style={styles.view}>
            {forecast?.data?.map((newForecast: any, key: any) => (
              <Weather forecast={newForecast} key={key} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  view: {
    flexDirection: "row",
    marginLeft: 5,
    marginRight: 5,
  },
});
