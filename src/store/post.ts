import { collection, getDocs } from "firebase/firestore";
import { atom, selector } from "recoil";
import { db } from "../firebase";

export interface Post {
	date: number,
	id: string,
	imgUrl: string,
	uid: string,
	createdAt : string,
	location: string;
	weather: string;
	humidity: string
}

export const postData = selector<Post[]>({
	key: "postData",
	get: async () => {
		try {
			const posts = collection(db, "post");
			const postItems = await getDocs(posts);
			const post = postItems.docs.map((doc) => doc.data() as Post);
            console.log(post)
			return post || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});

export const userPost = atom({
	key: "userPost",
	default: new Array(7).fill(null)
})