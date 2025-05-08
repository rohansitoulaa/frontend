import { fetchWeatherData } from "../services/weatherServices";

const weatherLocal = async (): Promise<void> => {
  try {
    const weather = await fetchWeatherData();

    if (weather) {
      localStorage.setItem("weather", JSON.stringify(weather));
      console.log("Saved to localStorage:", weather);
    }
  } catch (error) {
    console.error("Error in weatherLocal():", error);
  }
};

export default weatherLocal;
