import { collection, getDocs } from "firebase/firestore";
import { atom, selector } from "recoil";
import { db } from "../firebase";

export interface Comments {
	author: string;
	comment: string;
	createdAt: number;
}

export interface Post {
	date: number;
	id: string;
	imgUrl: string;
	uid: string;
	createdAt?: number;
	location?: string;
	weather?: string;
	humidity?: string;
	degree?: number;
	isPost?: boolean;
	comments?: Comments[]
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

export const userPost = atom<Post[]>({
	key: "userPost",
	default: new Array(7),
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