import { useEffect } from "react";

const userLocationString = localStorage.getItem('userLocation');
export const userLocation = userLocationString !== null ? JSON.parse(userLocationString) : [37.57, 126.9];

export const GetGeoInfo = () => {
	const [, setLocation] = userLocation

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			const newLocation = [position.coords.latitude, position.coords.longitude]
			setLocation(newLocation);
			localStorage.setItem('userLocation', JSON.stringify(newLocation));
		});
	}, []);

	return null;
};
