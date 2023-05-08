import { useRecoilState } from "recoil";
import { geolocation } from "../store/geolocation";
import { useEffect } from "react";

export const GetGeoInfo = () => {
	const [location, setLocation] = useRecoilState(geolocation);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});
	}, []);

	return null;
};
