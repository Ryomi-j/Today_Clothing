import { collection, getDocs } from "firebase/firestore";
import { atom, selector } from "recoil";
import { db } from "../firebase";

export interface Post {
	date?: number;
	id: string;
	imgUrl: string;
	uid?: string;
	createdAt?: number;
	location?: string;
	weather?: string;
	humidity?: string;
	degree?: number;
	isPost?: boolean;
}

export interface DefaultPost {
	imgUrl: string;
	id: string;
	degree: number;
}

export const postData = selector<Post[]>({
	key: "postData",
	get: async () => {
		try {
			const posts = collection(db, "post");
			const postItems = await getDocs(posts);
			const post = postItems.docs.map((doc) => doc.data() as Post);
			return post || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});

export const nextWeekUserPost = atom<Post[]>({
	key: "nextWeekUserPost",
	default: new Array(7).fill(null),
});

export const defaultData = selector<DefaultPost[]>({
	key: "defaultData",
	get: async () => {
		try {
			const posts = collection(db, "defaultData");
			const postItems = await getDocs(posts);
			const post = postItems.docs.map((doc) => doc.data() as DefaultPost);
			return post || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});