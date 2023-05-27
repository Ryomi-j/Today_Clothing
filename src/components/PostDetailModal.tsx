import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsFillSendFill } from "react-icons/bs";
import { Post, getSelectedPostRef } from "../store/post";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { setDoc, updateDoc } from "firebase/firestore";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/user";

interface PostDetailModalProps {
	clickedPost: Post;
	isLogin: boolean;
	userName: string;
	isChecked: boolean;
	onClose: MouseEventHandler<HTMLSpanElement>;
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
			if (clickedPostItem.comments) {
				const newComments = [...clickedPostItem.comments.slice(0, idx), ...clickedPostItem.comments.slice(idx + 1)];
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
		if (clickedBtn.innerText === "SAVE" && clickedPostItem.comments) {
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

	const deletePost = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		getSelectedPostRef(clickedPost).then(async (postRef) => {
			await updateDoc(postRef, { isPost: false, comments: [] });
		});
		const index = posts.findIndex((post) => post.id === clickedPost.id);
		const newPosts = [...posts.slice(0, index), ...posts.slice(index + 1)];
		setPosts(newPosts);
		onClose(e);
	};

	return (
		<>
			<input type="checkbox" id="my-modal-6" className="modal-toggle" checked readOnly />
			<div className="modal ">
				<div className="modal-box relative max-w-3xl xxxs:p-0 sm:p-1.5">
					<span className="btn btn-sm btn-circle absolute right-2 top-2" onClick={onClose}>
						✕
					</span>
					<article className="flex flex-col md:flex-row">
						<div className="m-auto sm:w-96">
							<figure className="mb-0 xs:m-5 max-w-xs h-auto md:h-auto overflow-hidden object-cover rounded-lg p-5">
								<img src={clickedPost?.imgUrl} alt={`${clickedPost?.uid}-${clickedPost?.date}-clothing info`} />
								{user && clickedPost.uid === user.uid && (
									<span
										className="absolute top-1 right-2 btn btn-ghost btn-xs btn-circle"
										onClick={(e) => {
											deletePost(e);
										}}
									>
										✕
									</span>
								)}
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center p-3 xs:p-4">
								<div className="badge badge-primary badge-outline">#{clickedPost?.location}</div>
								<div className="badge badge-secondary badge-outline">#{clickedPost?.weather}</div>
								<div className="badge badge-outline">#{`${clickedPost?.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${clickedPost?.humidity}%`}</div>
								<div className="badge badge-secondary badge-outline">
									#{new Date(clickedPost.date).toString().slice(0, 15)}
								</div>
							</div>
						</div>
						<div className="card-body max-w-3xl xs:gap-5 xxxs:text-xs md:text-base p-4 ">
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
										<div className="flex items-center w-6 h-full cursor-pointer" onClick={writeComment}>
											<BsFillSendFill className="mr-1" />
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
													className={`flex pl-1 break-all ${commentsState[idx] ? "hidden" : ""}`}
												>
													<span>{item.comment}</span>
													{item.author === userName && (
														<span className="flex items-center pl-1" onClick={(e) => handleComment(e, idx)}>
															<button className="p-1 rounded-lg text-[1px] sm:text-xs leading-none hover:bg-slate-300">
																EDIT
															</button>
															<button className="p-1 rounded-lg text-[1px] sm:text-xs leading-none hover:bg-slate-300">
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
														<button className="text-white bg-secondary p-1 rounded-lg text-[1px] sm:text-xs leading-non">
															SAVE
														</button>
														<button className="bg-slate-300 p-1 rounded-lg text-[1px] sm:text-xs leading-none">
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
