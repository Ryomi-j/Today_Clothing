import { atom } from "recoil";

export interface User {
	createdAt: string;
	name: string;
	uid: string;
	userId: string;
}

export const userState = atom({
	key: "isLogin",
	default: false,
});

export const userInfo = atom<User | null>({
	key: "userInfo",
	default: null,
});