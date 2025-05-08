import axios from "axios";
import getGeolocation from "../utils/getGeoLocation";
import { WEATHER_API_KEY } from "../config/config";

const API_KEY = WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ICON_URL = "https://openweathermap.org/img/wn/";

interface WeatherMinimal {
  temp: number;
  iconUrl: string;
}

export const fetchWeatherData = async (): Promise<WeatherMinimal | null> => {
  try {
    const { latitude, longitude } = await getGeolocation();

    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: "metric",
      },
    });

    const data = response.data;
    const temp = data.main.temp;
    const icon = data.weather[0].icon;
    const iconUrl = `${ICON_URL}${icon}@2x.png`;

    return { temp, iconUrl };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
