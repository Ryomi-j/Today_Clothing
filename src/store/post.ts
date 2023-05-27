import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { SetterOrUpdater, atom, selector } from "recoil";
import { db } from "../firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";

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
	comments?: Comments[];
}

export interface DefaultPost {
	imgUrl: string;
	id: string;
	degree: number;
}

interface DeletePostProps {
	clickedPost: Post;
	postArr?: Post[];
	setPostArr?: SetterOrUpdater<Post[]>;
	userPosts: Post[];
	setUserPosts: SetterOrUpdater<Post[]>;
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

export const getPostDefaultData = async (degree: number) => {
	let degreeRange: number;

	switch (true) {
		case degree < 0:
			degreeRange = 0;
			break;
		case degree < 5:
			degreeRange = 5;
			break;
		case degree < 9:
			degreeRange = 9;
			break;
		case degree < 12:
			degreeRange = 12;
			break;
		case degree < 17:
			degreeRange = 17;
			break;
		case degree < 20:
			degreeRange = 20;
			break;
		case degree < 23:
			degreeRange = 23;
			break;
		default:
			degreeRange = 28;
			break;
	}

	const q = query(collection(db, "defaultData"), where("degree", "==", degreeRange));
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs[0].data();
};

export const nextWeekUserPost = atom<Post[]>({
	key: "nextweekUserPost",
	default: new Array(7),
});

export const userPost = atom<Post[]>({
	key: "userPost",
	default: [],
});

export const getSelectedPostRef = async (post: Post) => {
	const posts = collection(db, "post");
	const q = query(posts, where("id", "==", post.id));
	const selectedPostDocs = await getDocs(q);
	return selectedPostDocs.docs[0].ref;
};

export const deleteImg = (imgUrl: string) => {
	const storage = getStorage();
	const postRef = ref(storage, imgUrl);

	deleteObject(postRef);
};

export const deletePost = ({ clickedPost, postArr, setPostArr, userPosts, setUserPosts }: DeletePostProps) => {
	if (clickedPost) {
		deleteImg(clickedPost?.imgUrl);
		getSelectedPostRef(clickedPost).then(async (postRef) => {
			await deleteDoc(postRef);
			if (postArr && setPostArr) {
				const idx = postArr.findIndex((post) => post.imgUrl === clickedPost.imgUrl);
				const newPostArr = new Array(7);
				postArr.forEach((post, i) => {
					if (i !== idx) newPostArr[i] = { ...post };
				});
				setPostArr(newPostArr);
			}
			setUserPosts(userPosts.filter((post) => post.imgUrl !== clickedPost.imgUrl));
		});
	}
};
