import axios from "axios";
import { selector } from "recoil";
import { geolocation } from "../store/geolocation";

interface WeatherProps {
	location: string;
	temp: number;
	humidity: number;
	weather: string;
}

export const weatherData = selector<WeatherProps>({
	key: "weatherData",
	get: async ({ get }) => {
		const [lat, lon] = get(geolocation);
		const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
		const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`;

		console.log(lat, lon);
		try {
			const response = await axios.get(WEATHER_API);
			const weatherProps: WeatherProps = {
				location: response.data.name,
				temp: +(response.data.main.temp - 273.15).toFixed(1),
				humidity: response.data.main.humidity,
				weather: response.data.weather[0].description,
			};
			console.log(response.data);
			return weatherProps;
		} catch (error) {
			console.log(error);
			return {
				location: "",
				temp: 0,
				humidity: 0,
				weather: "",
			};
		}
	},
});
