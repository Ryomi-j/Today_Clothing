import { collection, getDocs } from "firebase/firestore";
import { UserWithProfile, db } from "../firebase";
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

// 로그인 여부 T/F
export const userState = atom({
	key: "isLogin",
	default: false,
});

export const userInfo = atom<UserWithProfile | null>({
	key: "userInfo",
	default: null,
});

export const userData = selector<UserWithProfile[]>({
	key: "userData",
	get: async () => {
		try {
			const users = collection(db, "users");
			const usersInfo = await getDocs(users);
			const user = usersInfo.docs.map((doc) => doc.data() as UserWithProfile);
			console.log(user);
			return user || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});
