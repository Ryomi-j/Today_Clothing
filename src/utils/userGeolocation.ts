import { useRecoilState } from "recoil";
import { geolocation } from "../store/geolocation";
import { useEffect } from "react";

export const GetGeoInfo = () => {
	const [, setLocation] = useRecoilState(geolocation);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			const newLocation = [position.coords.latitude, position.coords.longitude]
			setLocation(newLocation);
			localStorage.setItem('userLocation', JSON.stringify(newLocation));
		});
	}, []);

	return null;
};
