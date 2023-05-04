import { useRecoilState } from "recoil";
import { geolocation } from "../store/geolocation";
import { useCallback } from "react";

export const getGeoInfo = () => {
	const [location, setLocation] = useRecoilState(geolocation);

	const getUserGeoInfo = useCallback(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			setLocation([position.coords.latitude, position.coords.longitude]);
		});
	}, [setLocation]);

	return { getUserGeoInfo };
};
