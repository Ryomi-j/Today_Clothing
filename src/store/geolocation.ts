import { atom } from "recoil";

export const geolocation = atom({
    key: "geolocation",
    default: [37.57, 126.9]
})