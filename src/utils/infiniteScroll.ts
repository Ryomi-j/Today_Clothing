import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Post } from "../store/post";

interface infiniteScrollProps {
	setPosts: React.Dispatch<React.SetStateAction<Post[] | []>>;
	posts: Post[] | [];
}

export const infiniteScroll = ({setPosts, posts} : infiniteScrollProps) => {
	const [, setPage] = useState(1);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const postRef = collection(db, "post");
			const querySnapshot = await getDocs(query(postRef, where("isPost", "==", true), orderBy("createdAt"), limit(3)));

			const items: Post[] = [];
			querySnapshot.forEach((doc) => {
				items.push({ ...doc.data() } as Post);
			});
			setPosts(items);
		};

		fetchData();
	}, []);

	const handleScroll = async (): Promise<void> => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight && posts) {
			const postRef = collection(db, "post");
			const querySnapshot = await getDocs(
				query(
					postRef,
					where("isPost", "==", true),
					orderBy("createdAt"),
					startAfter(posts[posts.length - 1].createdAt),
					limit(4)
				)
			);

			const items: Post[] = [];
			querySnapshot.forEach((doc) => {
				items.push({ ...doc.data() } as Post);
			});
			setPosts((prevList: Post[] | undefined) => [...(prevList ?? []), ...items]);
			setPage((prevPage) => prevPage + 1);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return (): void => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [posts]);
};
