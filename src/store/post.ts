import { collection, getDocs } from "firebase/firestore";
import { selector } from "recoil";
import { db } from "../firebase";

export interface Post {
	createdAt : string,
	img: string;
	location: string;
	pw: string;
	userId: string;
	weather: string;
}

export const PostData = selector<Post[]>({
	key: "postData",
	get: async () => {
		try {
			const posts = collection(db, "post");
			const postData = await getDocs(posts);
			const post = postData.docs.map((doc) => doc.data() as Post);
            console.log(post)
			return post || [];
		} catch (error) {
			console.error(error);
			return [];
		}
	},
});