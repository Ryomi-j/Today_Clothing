import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsFillSendFill } from "react-icons/bs";
import { Post, getSelectedPostRef } from "../store/post";
import { useEffect, useRef, useState } from "react";
import { setDoc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/user";

interface PostDetailModalProps {
	clickedPost: Post;
	isLogin: boolean;
	userName: string;
	isChecked: boolean;
	onClose: () => void;
	posts: Post[];
	setPosts: Function;
}

export const PostDetailModal = ({
	clickedPost,
	isLogin,
	userName,
	isChecked,
	onClose,
	posts,
	setPosts,
}: PostDetailModalProps) => {
	const user = useRecoilValue(userInfo);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [comments, setComments] = useState(clickedPost.comments || []);
	const [commentsState, setCommentsState] = useState<boolean[]>([]);
	const [clickedPostItem, setClickedPostItem] = useState<Post>(clickedPost);
	const [newComment, setNewComment] = useState<string>("");

	if (!isChecked) return <></>;

	const writeComment = () => {
		const writtenComment = textareaRef.current?.value;

		if (writtenComment && comments) {
			const newComment = {
				author: userName,
				comment: writtenComment,
				createdAt: new Date().getTime(),
			};

			const newComments = comments ? [...comments, newComment] : [newComment];

			getSelectedPostRef(clickedPost).then((postRef) => {
				const newData = {
					...clickedPost,
					comments: newComments,
				};
				setDoc(postRef, newData, { merge: true });
				setComments(newComments);
				const idx = posts.findIndex((post) => post.id === clickedPost.id);
				posts[idx] = newData;
				setPosts(posts);
				if (textareaRef.current) {
					textareaRef.current.value = "";
				}
			});
		}
	};

	useEffect(() => {
		if (clickedPost && clickedPost.comments && clickedPost.comments.length > 0) {
			setCommentsState(new Array(clickedPost.comments.length).fill(false));
		}
	}, [clickedPost]);

	const handleComment = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, idx: number) => {
		const clickedBtn = e.target as HTMLButtonElement;
		if (clickedBtn.innerText === "EDIT") {
			if (commentsState.every((x) => !x)) {
				setCommentsState((prev) => {
					prev[idx] = true;
					return [...prev];
				});
			}
			if (clickedPostItem.comments) {
				setNewComment(comments[idx].comment);
			}
		}

		if (clickedBtn.innerText === "DELETE") {
			if (comments[idx]) {
				const newComments = [...comments.slice(0, idx), ...comments.slice(idx + 1)];
				getSelectedPostRef(clickedPost).then(async (postRef) => {
					await updateDoc(postRef, { comments: newComments });
				});
				setComments(newComments);
				const newData = {
					...clickedPost,
					comments: newComments,
				};
				setClickedPostItem(newData);
				const index = posts.findIndex((post) => post.id === clickedPost.id);
				posts[index] = newData;
			}
		}
	};

	const handleEditComment = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
		const clickedBtn = e.target as HTMLButtonElement;
		if (clickedBtn.innerText === "SAVE") {
			const commentsArr = [...comments];
			commentsArr[idx].comment = newComment;
			const newComments = [...commentsArr];
			getSelectedPostRef(clickedPost).then(async (postRef) => {
				await updateDoc(postRef, { comments: newComments });
			});
			setComments(newComments);
			const newData = {
				...clickedPostItem,
				comments: newComments,
			};
			setClickedPostItem(newData);
			const index = posts.findIndex((post) => post.id === clickedPost.id);
			posts[index] = newData;
			localStorage.setItem("posts", JSON.stringify(posts));
			setCommentsState((prev) => {
				prev[idx] = false;
				return [...prev];
			});
		}

		if (clickedBtn.innerText === "CANCEL") {
			setCommentsState((prev) => {
				prev[idx] = false;
				return [...prev];
			});
		}
	};

	const deletePost = () => {
		getSelectedPostRef(clickedPost).then(async (postRef) => {
			await updateDoc(postRef, { isPost: false, comments: [] });
		});
		const index = posts.findIndex((post) => post.id === clickedPost.id);
		const newPosts = [...posts.slice(0, index), ...posts.slice(index + 1)];
		setPosts(newPosts);
		onClose();
	};

	return (
		<>
			<input type="checkbox" id={`${clickedPost.createdAt}-${clickedPost.uid}`} className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-3xl p-0 sm:p-1.5">
					<span className="btn btn-xs sm:btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>
						✕
					</span>
					<article className="flex flex-col md:flex-row p-2">
						<div className="m-auto sm:w-1/2 mr-7 md:mr-0">
							<figure className="relative mb-0 xs:m-5 max-w-xs h-auto md:h-auto overflow-hidden object-cover rounded-lg">
								<img src={clickedPost?.imgUrl} alt={`${clickedPost?.uid}-${clickedPost?.date}-clothing info`} />
								{user && clickedPost.uid === user.uid && (
									<span
										className="absolute top-6 right-6 btn btn-xs sm:btn-sm btn-circle bg-white text-black"
										onClick={deletePost}
									>
										✕
									</span>
								)}
							</figure>
							<div className="card-body flex-row flex-wrap justify-center items-center text-center p-2">
								<div className="badge badge-primary badge-outline">#{clickedPost?.location}</div>
								<div className="badge badge-secondary badge-outline">#{clickedPost?.weather}</div>
								<div className="badge badge-outline">#{`${clickedPost?.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${clickedPost?.humidity}%`}</div>
								<div className="badge badge-secondary badge-outline">
									#{new Date(clickedPost.date).toString().slice(0, 15)}
								</div>
							</div>
						</div>
						<div className="card-body sm:w-1/2 xs:gap-5 text-sm md:text-base p-4 ">
							{isLogin && (
								<div className="flex gap-2 flex-col">
									<span className="font-bold">{userName}</span>
									<div className="flex items-center w-full  border-solid border-2 border-slate-300 rounded-lg">
										<textarea
											className="textarea w-full focus:outline-none resize-none overflow-auto"
											maxLength={100}
											placeholder="댓글을 입력해주세요."
											ref={textareaRef}
										/>
										<div className="flex items-center h-full cursor-pointer" onClick={writeComment}>
											<BsFillSendFill className="w-10" />
										</div>
									</div>
								</div>
							)}
							<div className="flex flex-col gap-1 max-h-96 overflow-auto justify-center">
								{comments &&
									comments.map((item, idx) => {
										return (
											<div key={idx} className="flex gap-1">
												<span className="font-bold">{item.author}</span>
												<div
													id={item.createdAt.toString()}
													className={`flex pl-1 break-all flex-wrap ${commentsState[idx] ? "hidden" : ""}`}
												>
													<span>{item.comment}</span>
													{item.author === userName && (
														<span className="flex items-center gap-1 pl-1" onClick={(e) => handleComment(e, idx)}>
															<button className=" bg-slate-200 p-1 rounded-lg leading-none">
																EDIT
															</button>
															<button className="bg-slate-500 text-white p-1 rounded-lg leading-none">
																DELETE
															</button>
														</span>
													)}
												</div>
												<div
													id={`${item.createdAt.toString()}Edit`}
													className={`pl-1 break-all w-full ${commentsState[idx] ? "" : "hidden"}`}
												>
													<textarea
														value={newComment}
														onChange={(e) => setNewComment(e.target.value)}
														className="border-2 resize-none w-full"
													/>
													<div
														className="flex justify-end items-center pl-1 gap-1"
														onClick={(e) => handleEditComment(e, idx)}
													>
														<button className="text-white bg-secondary p-1 rounded-lg leading-none">
															SAVE
														</button>
														<button className="bg-slate-300 p-1 rounded-lg leading-none">
															CANCEL
														</button>
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
		</>
	);
};
