// STEP 1：載入會用到的 React Hooks
import { useState, useEffect, useCallback } from "react";
const authorizationKey = "CWB-507B37E0-0383-4D8C-878D-628B54EC3536";
const fetchCurrentWeather = (locationName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${authorizationKey}&locationName=${locationName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];

      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["TEMP", "H_UVI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        },
        {}
      );
      return {
        observationTime: locationData.time.obsTime,
        locationName: locationData.locationName,
        temperature: weatherElements.TEMP,
        uvi: weatherElements.H_UVI
      };
    });
};

const fetchWeatherForecast = (cityName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${authorizationKey}&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (["Wx", "MaxT", "MinT", "PoP", "CI"].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        },
        {}
      );

      return {
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        minTemperature: weatherElements.MinT.parameterName,
        maxTemperature: weatherElements.MaxT.parameterName,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: "",
    description: "",
    temperature: 0,
    MinTemperature: 0,
    MaxTemperature: 0,
    uvi: 0,
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: ""
  });

  const fetchData = useCallback(() => {
    const fetchingData = async () => {
      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecast(cityName)
      ]);

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast
      });
    };

    setWeatherElement((prevState) => ({
      ...prevState
    }));

    fetchingData();
    //因為 fetchingData 沒有相依到 React 組件中的資料狀態，所以 dependencies 帶入空陣列
  }, [locationName, cityName]);

  useEffect(() => {
    fetchData();
    // 把透過 useCallback 回傳的函式放到 useEffect 的 dependencies 中
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;
