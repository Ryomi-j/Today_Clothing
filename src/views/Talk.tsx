import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRecoilValue } from "recoil";
import { Comments, Post } from "../store/post";
import { useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { v4 } from "uuid";
import { userInfo, userState } from "../store/user";
import { UserWithProfile, db } from "../firebase";
import { collection, getDocs, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";

export const Talk = () => {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [clickedPost, setClickedPost] = useState<Post | undefined>(undefined);
	const isLogin = useRecoilValue(userState);

	const user = useRecoilValue<UserWithProfile | null>(userInfo);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [comments, setComments] = useState<Comments[] | undefined>([]);
	const [userComment, setUserComment] = useState<string | undefined>(undefined);
	const [editState, setEditState] = useState(false);
	const [commentBox, setCommentBox] = useState<HTMLElement | null>(null);
	const [editCommentBox, setEditCommentBox] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const posts = collection(db, "post");
		const q = query(posts, where("isPost", "==", true));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const post = snapshot.docs.map((doc) => doc.data() as Post);
			setPosts(post);
		});
		return unsubscribe;
	}, []);

	const getSelectedPostDocs = async (post: Post) => {
		const posts = collection(db, "post");
		const q = query(posts, where("id", "==", post.id));
		const selectedPostDocs = await getDocs(q);
		return selectedPostDocs;
	};

	const writeComment = () => {
		const comment = textareaRef.current?.value;
		if (comment && clickedPost) {
			getSelectedPostDocs(clickedPost)
				.then((selectedPostDoc) => {
					const doc = selectedPostDoc.docs[0];
					const postRef = doc.ref;
					const postData = doc.data() as Post;
					const newComment = {
						comment: comment,
						createdAt: new Date().getTime(),
						author: user?.name || "",
					};
					const comments = postData.comments ? [...postData.comments, newComment] : [newComment];
					setDoc(
						postRef,
						{
							...postData,
							comments,
						},
						{ merge: true }
					);
					if (comments) setComments(comments);
					if (textareaRef.current) {
						textareaRef.current.value = "";
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	const handlePostClick = (post: Post) => {
		setClickedPost(post);
		setComments(post.comments);
	};

	const handleEditCommentBtn = (item: Comments) => {
		if (editState) {
			alert("이미 수정중인 댓글이 있습니다.");
			setEditState(false);
			return;
		} else {
			setEditState(true);
			setCommentBox(document.getElementById(item.createdAt.toString()));
			setEditCommentBox(document.getElementById(`${item.createdAt.toString()}Edit`));
			if (commentBox && editCommentBox) {
				commentBox.style.display = "none";
				editCommentBox.style.display = "block";
			}
			setUserComment(item.comment);
		}
	};

	const saveEditedComment = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
		const clickedButton = e.target as HTMLButtonElement;
		const buttonText = clickedButton.innerText;
		console.log(buttonText, userComment);
		if (buttonText === "SAVE" && userComment) {
			if (comments && comments[idx].comment !== userComment) {
				if (comments) {
					comments[idx].comment = userComment;
					const collectionRef = collection(db, "post");
					const querySnapshot = await getDocs(query(collectionRef, where("imgUrl", "==", clickedPost?.imgUrl)));
					if (querySnapshot.empty) {
						console.log("No matching documents");
					} else {
						const doc = querySnapshot.docs[0];
						const postData = doc.data() as Post;
						const postRef = doc.ref;
						console.log(doc.data());
						await setDoc(postRef, { ...postData, comments: comments }, { merge: true });
					}
				}
				if (commentBox && editCommentBox) {
					commentBox.style.display = "block";
					editCommentBox.style.display = "none";
				}
			}
		}
		setUserComment(undefined);
		setEditState(false);
		setUserComment(undefined);
		setEditState(false);

		if (commentBox && editCommentBox) {
			commentBox.style.display = "block";
			editCommentBox.style.display = "none";
		}
	};

	const deleteComment = async (idx: number) => {
		const collectionRef = collection(db, "post");
		const querySnapshot = await getDocs(query(collectionRef, where("id", "==", clickedPost?.id)));

		if (querySnapshot.empty) {
			console.log("No matching documents");
		} else {
			if (comments) {
				const doc = querySnapshot.docs[0];
				const postRef = doc.ref;
				const newComments = [...comments.slice(0, idx), ...comments.slice(idx + 1)];
				await updateDoc(postRef, { comments: newComments });
				setComments(newComments);
			}
		}
	};

	return (
		<div className="flex flex-col items-center min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<Carousel
				autoPlay
				showThumbs={false}
				interval={6000}
				showStatus={false}
				infiniteLoop={true}
				className="flex justify-center max-w-screen-2xl"
			>
				<div className="overflow-hidden">
					<div className="detail p-4 text-left text-4xl">
						<p className="text-red-600 text-4xl">Early Bird Sale</p>다가온 여름, 먼저 준비하세요
					</div>
					<img src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fyoung-woman-gfdde5ca04_1920.jpg?alt=media&token=cd90a93e-4db0-47f3-8249-ae1f8e6a4a97" />
				</div>
				<div>
					<div className="detail p-4 text-left text-4xl">
						<p className="text-red-600 text-4xl">Big Sale</p> 봄 상품 80% sale
					</div>
					<img src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fman-g97c9fcec5_1920.jpg?alt=media&token=1ca0e230-7b37-48d6-a4f8-9738524168f6" />
				</div>
			</Carousel>
			<div className="grid grid-cols-3 gap-6 my-10 justify-center items-center max-w-screen-2xl">
				{posts?.map((post) => {
					return (
						<label
							key={v4()}
							htmlFor={`${post.createdAt}-${post.uid}`}
							className="card card-compact bg-base-100 shadow-xl cursor-pointer block"
							onClick={() => {
								handlePostClick(post);
							}}
						>
							<figure className="mx-5 mt-5 h-72 overflow-hidden object-cover">
								<img src={post.imgUrl} alt={`${post.uid}-${post.date}-clothing info`} className="rounded-xl" />
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center">
								<div className="badge badge-primary badge-outline">#{post.location}</div>
								<div className="badge badge-secondary badge-outline">#{post.weather}</div>
								<div className="badge badge-outline">#{`${post.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${post.humidity}%`}</div>
								<div className="badge badge-info badge-outline">
									#{new Date(Number(clickedPost?.date)).toString().slice(0, 15)}
								</div>
							</div>
						</label>
					);
				})}
			</div>
			<input type="checkbox" id={`${clickedPost?.createdAt}-${clickedPost?.uid}`} className="modal-toggle" />
			<div className="modal ">
				<div className="modal-box relative max-w-3xl">
					<label
						htmlFor={`${clickedPost?.createdAt}-${clickedPost?.uid}`}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<article className="flex">
						<div>
							<figure className="mx-5 mt-5 max-w-xs overflow-hidden object-cover">
								<img
									src={clickedPost?.imgUrl}
									alt={`${clickedPost?.uid}-${clickedPost?.date}-clothing info`}
									className="rounded-xl"
								/>
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center">
								<div className="badge badge-primary badge-outline">#{clickedPost?.location}</div>
								<div className="badge badge-secondary badge-outline">#{clickedPost?.weather}</div>
								<div className="badge badge-outline">#{`${clickedPost?.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${clickedPost?.humidity}%`}</div>
								<div className="badge badge-info badge-outline">
									#{new Date(Number(clickedPost?.date)).toString().slice(0, 15)}
								</div>
							</div>
						</div>
						<div className="card-body max-w-3xl gap-5">
							{isLogin && (
								<div className="flex gap-2">
									<span className="font-bold">{user?.name}</span>
									<div className="flex items-center w-full  border-solid border-2 border-indigo-600 rounded-lg">
										<textarea
											className="textarea w-full focus:outline-none resize-none overflow-auto"
											maxLength={100}
											placeholder="댓글을 입력해주세요."
											ref={textareaRef}
										/>
										<div className="flex items-center w-6 h-full cursor-pointer" onClick={writeComment}>
											<BsFillSendFill className="mr-1" />
										</div>
									</div>
								</div>
							)}
							<div className="flex flex-col max-h-96 overflow-auto">
								{comments &&
									comments.map((item, idx) => {
										return (
											<div key={item.createdAt.toString()} className="flex gap-1">
												<span className="font-bold">{item.author}</span>
												<div id={item.createdAt.toString()} className="comment pl-1 break-all">
													<span className="inline-block">{item.comment}</span>
													{item.author === user?.name && (
														<span className="pl-1">
															<button className="btn btn-primary btn-xs" onClick={() => handleEditCommentBtn(item)}>
																Edit
															</button>
															<button className="btn btn-xs ml-1" onClick={() => deleteComment(idx)}>
																delete
															</button>
														</span>
													)}
												</div>
												<div id={`${item.createdAt.toString()}Edit`} className="pl-1 break-all hidden">
													<textarea
														value={userComment}
														onChange={(e) => {
															setUserComment(e.target.value);
														}}
														className="border-2 resize-none w-full"
													/>
													<div className="pl-1" onClick={(e) => saveEditedComment(e, idx)}>
														<button className="btn btn-primary btn-xs">save</button>
														<button className="btn btn-xs ml-1">cancel</button>
													</div>
												</div>
											</div>
										);
									})}
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
};
