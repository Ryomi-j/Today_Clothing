import { atom } from "recoil";

export interface User {
	createdAt: string;
	name: string;
	uid: string;
	userId: string;
}

export const userInfo = atom<User | null>({
	key: "userInfo",
	default: null,
});