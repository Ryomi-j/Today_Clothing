import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { atom, selector } from "recoil";

export interface Data {
	createdAt: string;
	date: string;
	humidity: string;
	isPublic: boolean;
	location: string;
	src: string;
	tag: string;
	temperature: number;
	weather: string;
}

export interface User {
	creactedAt: string,
	name: string | null;
	uid: string;
	userId: string;
	data?: Data;
}

// 로그인 여부 T/F
export const userState = atom({
	key: "isLogin",
	default: false,
});

export const userInfo = atom({
	key: "userInfo",
	default: {},
});

export const userData = selector<User[]>({
	key: "userData",
	get: async () => {
		try {
			const users = collection(db, "users");
			const usersInfo = await getDocs(users);
			const user = usersInfo.docs.map((doc) => doc.data() as User);
			console.log(user);
			return user || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});
