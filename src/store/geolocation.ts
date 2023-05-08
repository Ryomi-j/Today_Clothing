import { atom } from "recoil";

const userLocationString = localStorage.getItem('userLocation');
const userLocation = userLocationString !== null ? JSON.parse(userLocationString) : [37.57, 126.9];

export const geolocation = atom({
    key: "geolocation",
    default: userLocation
})