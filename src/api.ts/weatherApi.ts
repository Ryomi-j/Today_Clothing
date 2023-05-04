import axios from "axios";
import { selector, useRecoilValue } from "recoil";
import { geolocation } from "../store/geolocation";

interface WeatherProps {
	location: string;
	temp: number;
	humidity: number;
	weather: string;
}

const [lat, lon] = useRecoilValue(geolocation);
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const lang = "kr";

const WEATHER_API = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=${lang}`;

export const weatherData = selector<WeatherProps>({
	key: "weatherData",
	get: async () => {
		try {
			const response = await axios.get(WEATHER_API);
			const weatherProps: WeatherProps = {
				location: response.data.name,
				temp: response.data.main.temp,
				humidity: response.data.main.humidity,
				weather: response.data.weather[0].main,
			};
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