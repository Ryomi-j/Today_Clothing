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
	id: string;
	pw: string;
	data?: Data;
}

// 로그인 여부 T/F
export const userState = atom({
	key: "isLogin",
	default: false,
});

// 현재 로그인한 user 정보
export const activeUser = atom({
	key: "activeUser",
	default: "",
});

export const UserData = selector<User[]>({
	key: "userData",
	get: async () => {
		try {
			const users = collection(db, "users");
			const userInfo = await getDocs(users);
			const user = userInfo.docs.map((doc) => doc.data() as User);
			console.log(user);
			return user || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});

export const userDB = (uid: string) => {
	
}