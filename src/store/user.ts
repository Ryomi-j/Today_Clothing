import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { atom, selector, useSetRecoilState } from "recoil";

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

interface UserState {
	userData: Record<string | number, User>;
}

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


