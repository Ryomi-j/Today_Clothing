import axios from "axios";
import { userLocation } from "../utils/userGeolocation";

export interface WeatherProps {
	location: string;
	temp: number;
	humidity: number;
	weather: string;
}

export const defaultWeatherData = {
	location: "",
	temp: 0,
	humidity: 0,
	weather: "",
};

export const weatherData = async () => {
	const [lat, lon] = userLocation;
	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
	const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`;

	try {
		const weatherInfo = await axios.get(WEATHER_API).then((response) => {
			return {
				location: response.data.name,
				temp: +(response.data.main.temp - 273.15).toFixed(1),
				humidity: response.data.main.humidity,
				weather: response.data.weather[0].description,
			};
		});
		return weatherInfo;
	} catch (error) {
		console.log(error);
		return {
			location: "",
			temp: 0,
			humidity: 0,
			weather: "",
		};
	}
};
