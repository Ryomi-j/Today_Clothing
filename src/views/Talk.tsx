import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRecoilValue } from "recoil";
import { Comments, Post } from "../store/post";
import { useEffect, useRef, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";
import { userInfo, userState } from "../store/user";
import { UserWithProfile, db } from "../firebase";
import { collection, getDocs, limit, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";

export const Talk = () => {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [clickedPost, setClickedPost] = useState<Post>({} as Post);
	const isLogin = useRecoilValue(userState);

	const user = useRecoilValue<UserWithProfile | null>(userInfo);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [userComment, setUserComment] = useState<string>("");
	const [commentBox] = useState<HTMLElement | null>(null);
	const [editCommentBox] = useState<HTMLElement | null>(null);
	const [commentsState, setCommentsState] = useState<boolean[]>([]);
	const [, setPage] = useState(1);

	const selectedData = (value: Date) => {
		const newPosts: any = [];
		if (posts) {
			posts.forEach((post) => {
				if (post.date) {
					const postDate = new Date(post.date).toString().slice(0, 15);
					const selecedData = value.toString().slice(0, 15);
					if (postDate === selecedData) newPosts.push(post);
				}
			});
			setPosts(newPosts);
		}
	};

	useEffect(() => {
		if (clickedPost && clickedPost?.comments && clickedPost.comments.length > 0) {
			setCommentsState(new Array(clickedPost.comments.length).fill(false));
		}
	}, [clickedPost]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			const postRef = collection(db, "post");
			const querySnapshot = await getDocs(query(postRef, where("isPost", "==", true), orderBy("createdAt"), limit(4)));

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
					).then(() => {
						if (comments) setClickedPost((prev) => ({ ...prev, comments } as Post));
						if (textareaRef.current) {
							textareaRef.current.value = "";
						}
					});
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	const handlePostClick = (post: Post) => {
		setClickedPost(post);
	};

	const handleEditCommentBtn = (item: Comments, idx: number) => {
		if (commentsState.every((x) => !x)) {
			setCommentsState((prev) => {
				prev[idx] = true;
				return [...prev];
			});
			setUserComment(item.comment);
		}
	};

	const saveEditedComment = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, idx: number) => {
		const clickedButton = e.target as HTMLButtonElement;
		const buttonText = clickedButton.innerText;
		if (buttonText === "save") {
			if (
				clickedPost !== undefined &&
				clickedPost.comments &&
				clickedPost.comments.length > 0 &&
				clickedPost.comments[idx] &&
				clickedPost.comments[idx].comment !== userComment
			) {
				if (clickedPost.comments) {
					clickedPost.comments[idx].comment = userComment;
					const collectionRef = collection(db, "post");
					const querySnapshot = await getDocs(query(collectionRef, where("imgUrl", "==", clickedPost?.imgUrl)));
					if (querySnapshot.empty) {
						console.log("No matching documents");
					} else {
						const doc = querySnapshot.docs[0];
						const postData = doc.data() as Post;
						const postRef = doc.ref;
						if (postData && postData.comments && postData.comments[idx]) {
							postData.comments[idx] = clickedPost.comments[idx];
							await setDoc(postRef, { ...postData }, { merge: true });
						}
					}
				}
				if (commentBox && editCommentBox) {
					commentBox.style.display = "block";
					editCommentBox.style.display = "none";
				}
			}
		}

		setUserComment("");
		setCommentsState((prev) => {
			prev[idx] = false;
			return [...prev];
		});

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
			if (clickedPost !== undefined && clickedPost.comments) {
				const doc = querySnapshot.docs[0];
				const postRef = doc.ref;
				const newComments = [...clickedPost.comments.slice(0, idx), ...clickedPost.comments.slice(idx + 1)];
				await updateDoc(postRef, { comments: newComments });
				setClickedPost((prev) => {
					return { ...prev, comments: newComments } as Post;
				});
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
				<Link to="/talk">
					<div className="overflow-hidden">
						<div className="detail flex flex-col gap-1 sm:gap-4 items-center p-0.5 xs:p-2 md:p-4 text-left text-xs ">
							<p className="text-red-600 md:font-medium text-sm xs:text-2xl font-medium md:text-4xl">Early Bird Sale</p>
							<p className="text-xs xs:text-base md:text-lg">여름상품, 신상할인</p>
						</div>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fyoung-woman-gfdde5ca04_1920.jpg?alt=media&token=cd90a93e-4db0-47f3-8249-ae1f8e6a4a97"
							alt="summer sale AD"
						/>
					</div>
				</Link>
				<Link to="/talk">
					<div>
						<div className="detail flex flex-col gap-1 sm:gap-4 items-center p-0.5 xs:p-2 md:p-4 text-left text-xs ">
							<p className="text-red-600 md:font-medium text-sm xs:text-2xl font-medium md:text-4xl">Big Sale</p>{" "}
							<p className="text-xs xs:text-base md:text-lg">봄 상품 80% sale</p>
						</div>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fman-g97c9fcec5_1920.jpg?alt=media&token=1ca0e230-7b37-48d6-a4f8-9738524168f6"
							alt="spring sale AD"
						/>
					</div>
				</Link>
			</Carousel>
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 my-10 justify-center items-center max-w-screen-2xl">
				{posts?.map((post, idx) => {
					return (
						<label
							key={idx}
							htmlFor={`${post.createdAt}-${post.uid}`}
							className="card card-compact bg-base-100 shadow-xl cursor-pointer h-80"
							onClick={() => {
								handlePostClick(post);
							}}
						>
							<figure className="mx-auto mt-5 w-4/5 h-3/5 overflow-hidden object-cover rounded-lg">
								<div
									className="w-full h-full bg-no-repeat bg-cover"
									style={{ backgroundImage: `url(${post.imgUrl})` }}
								></div>
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center">
								<div className="badge badge-primary badge-outline">#{post.location}</div>
								<div className="badge badge-secondary badge-outline">#{post.weather}</div>
								<div className="badge badge-outline">#{`${post.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${post.humidity}%`}</div>
								<div className="badge badge-info badge-outline">
									#{new Date(Number(post.date)).toString().slice(0, 15)}
								</div>
							</div>
						</label>
					);
				})}
			</div>
			<input type="checkbox" id={`${clickedPost?.createdAt}-${clickedPost?.uid}`} className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative max-w-3xl xxxs:p-0 sm:p-1.5">
					<label
						htmlFor={`${clickedPost?.createdAt}-${clickedPost?.uid}`}
						className="btn btn-sm btn-circle absolute right-2 top-2"
					>
						✕
					</label>
					<article className="flex flex-col md:flex-row">
						<div className="m-auto sm:w-96">
							<figure className="mb-0 xs:m-5 max-w-xs h-auto md:h-auto overflow-hidden object-cover rounded-lg p-5">
								<img
									src={clickedPost?.imgUrl}
									alt={`${clickedPost?.uid}-${clickedPost?.date}-clothing info`}
									className="rounded-xl"
								/>
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center p-3 xs:p-4">
								<div className="badge badge-primary badge-outline">#{clickedPost?.location}</div>
								<div className="badge badge-secondary badge-outline">#{clickedPost?.weather}</div>
								<div className="badge badge-outline">#{`${clickedPost?.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${clickedPost?.humidity}%`}</div>
								<div className="badge badge-info badge-outline">
									#{new Date(Number(clickedPost?.date)).toString().slice(0, 15)}
								</div>
							</div>
						</div>
						<div className="card-body max-w-sm  xs:gap-5 xxxs:text-xs md:text-base p-4 ">
							{isLogin && (
								<div className="flex gap-2 flex-col">
									<span className="font-bold ">{user?.name}</span>
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
								{clickedPost &&
									clickedPost.comments &&
									clickedPost.comments.map((item, idx) => {
										return (
											<div key={idx.toString()} className="flex gap-1">
												<span className="font-bold">{item.author}</span>
												<div
													id={item.createdAt.toString()}
													className={`flex flex-col pl-1 w-full break-all ${commentsState[idx] ? "hidden" : ""}`}
												>
													<span>{item.comment}</span>
													{item.author === user?.name && (
														<div className="flex items-center justify-end pl-1">
															<button
																className="bg-teal-400 p-1 rounded-lg text-[1px] sm:w-8 sm:text-xs leading-none"
																onClick={() => {
																	handleEditCommentBtn(item, idx);
																}}
															>
																Edit
															</button>
															<button
																className="bg-sky-500 ml-1 p-1 rounded-lg text-[1px] sm:w-11 sm:text-xs leading-none"
																onClick={() => deleteComment(idx)}
															>
																delete
															</button>
														</div>
													)}
												</div>
												<div
													id={`${item.createdAt.toString()}Edit`}
													className={`pl-1 break-all w-full ${commentsState[idx] ? "" : "hidden"}`}
												>
													<textarea
														value={userComment}
														onChange={(e) => {
															setUserComment(e.target.value);
														}}
														className="border-2 resize-none w-full"
													/>
													<div
														className="flex justify-end items-center pl-1 gap-1"
														onClick={(e) => saveEditedComment(e, idx)}
													>
														<button className="text-white bg-secondary p-1 rounded-lg text-[1px] sm:text-xs leading-non">
															save
														</button>
														<button className="bg-slate-300 p-1 rounded-lg text-[1px] sm:text-xs leading-none">
															cancel
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
			<div className="dropdown dropdown-end fixed top-3/4 right-3">
				<label tabIndex={0} className="btn bg-teal-50 border-teal-100 rounded-full ">
					<FcCalendar />
				</label>
				<ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					<Calendar onClickDay={(value) => selectedData(value)} />
				</ul>
			</div>
		</div>
	);
};
