import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../store/user";
import { v4 } from "uuid";
import { selectedDate } from "../store/editItem";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { nextWeekUserPost, userPostState } from "../store/post";
import { Modal } from "../components/common/Modal";

export const EditPost = () => {
	const { search } = useLocation();
	const [query, setQuery] = useState<{ [key: string]: string }>({});
	const date = useRecoilValue(selectedDate);
	const [postArr, setPostArr] = useRecoilState(nextWeekUserPost);
	const userPosts = useRecoilValue(userPostState);

	const [imgUrl, setImgUrl] = useState<undefined | string>("/public/addImg.svg");
	const [imgUpload, setImgUpload] = useState<undefined | File>(undefined);
	const user = useRecoilValue(userInfo);
	const userUid = user && user.uid;
	const [postId, setPostId] = useState("");

	useEffect(() => {
		if (search.length > 1) {
			search
				.slice(1)
				.split("&")
				.forEach((x) => {
					const [k, v] = x.split("=");
					query[k] = v;
					setQuery(query);
				});
		}
	}, []);

	const getPostData = useRecoilCallback(({ set }) => async () => {
		try {
			set(nextWeekUserPost, userPosts || []);
		} catch (error) {
			console.error(error);
			set(nextWeekUserPost, []);
		}
	});

	useEffect(() => {
		postArr.forEach((post) => {
			if (post && post.date === date) {
				setImgUrl(post.imgUrl);
				setPostId(post.id);
			}
		});
		getPostData();
	}, [postArr]);

	const getImgUrl = (file: File) => {
		const url = URL.createObjectURL(file);
		setImgUrl(url);
	};

	const uploadImg = () => {
		if (!imgUpload) return;

		const fileName = `${userUid + imgUpload.name + v4()}`;
		const imgRef = ref(storage, `imgs/${fileName}`);
		uploadBytes(imgRef, imgUpload).then((snapshot) => {
			getDownloadURL(snapshot.ref).then((downloadURL) => {
				const newData = {
					id: v4(),
					date: date,
					imgUrl: downloadURL,
					uid: userUid || "",
				};
				setDoc(doc(db, "post", `${userUid}${date}v4()`), newData).then(() => {
					getPostData();
					setImgUrl(downloadURL);
				});
			});
		});
	};

	const deleteImg = () => {
		const imgRef = ref(storage, imgUrl);
		deleteObject(imgRef)
			.then(() => {
				console.log("Image deleted successfully");
			})
			.catch((error) => {
				console.error("Error deleting image: ", error);
			});

		const docs = doc(db, "posts", postId);
		deleteDoc(docs)
			.then(() => {
				console.log("Document deleted successfully");
				const newPostArr = postArr.filter(post => post.id !== postId) 
				setPostArr(newPostArr)
			})
			.catch((error) => {
				console.error("Error deleting document: ", error);
			});
	};

	useEffect(() => {
		if (imgUrl) {
			const label = document.querySelector("#label");
			if (label instanceof HTMLElement) {
				label.style.backgroundImage = `url(${imgUrl})`;
				if (imgUrl !== "/public/addImg.svg") {
					label.style.width = "100%";
					label.style.height = "100%";
				}
			}
		}
	}, [imgUrl]);

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-auto mx-auto max-h-min py-7 px-14 bg-base-100 shadow-xl">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Edit Post</h2>
				<figure className="w-96 h-96 m-auto border-2 rounded-md bg-base-200">
					<label id="label" className="w-1/3 h-1/3 bg-no-repeat bg-center bg-contain cursor-pointer">
						<input
							type="file"
							accept=".jpg,.jpeg,.png"
							className="hidden"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0];
								if (file) {
									setImgUpload(file);
									getImgUrl(file);
								}
							}}
						/>
					</label>
				</figure>
				<div className="card-body max-h-fit">
					<h3 className=" mb-14 text-3xl font-semibold text-center">
						{query.content ? decodeURIComponent(query.content) : new Date(date).toString().slice(0, 4)}
					</h3>
					<div className="flex justify-end gap-2">
						<label htmlFor="my-modal-6" className="btn btn-primary" onClick={uploadImg}>
							Save
						</label>
						<Link to={`/${query.prevPage}`}>
							<button className="btn">Cancel</button>
						</Link>
						<label htmlFor="my-modal-6" className="btn btn-primary" onClick={deleteImg}>
							delete
						</label>
					</div>
				</div>
			</div>
			<Modal
				content={`이미지가 성공적으로 저장되었습니다. ${query.prevPage} 페이지로 이동합니다.`}
				btnContent="OK"
				link={`${query.prevPage}`}
			/>
		</div>
	);
};
