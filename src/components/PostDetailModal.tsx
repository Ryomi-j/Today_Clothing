import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsFillSendFill } from "react-icons/bs";
import { v4 } from "uuid";
import { Post } from "../store/post";
import { useRef, useState } from "react";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";

interface PostDetailModalProps {
	clickedPost: Post;
	isLogin: boolean;
	userName: string;
	isChecked: boolean;
	onClose: React.MouseEventHandler<HTMLLabelElement>;
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
	const [editboxState, setEditboxState] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [comments, setComments] = useState(clickedPost.comments);

	if (!isChecked) return <></>;

	const getSelectedPostRef = async (post: Post) => {
		const posts = collection(db, "post");
		const q = query(posts, where("id", "==", post.id));
		const selectedPostDocs = await getDocs(q);
		return selectedPostDocs.docs[0].ref;
	};

	const writeComment = () => {
		const comment = textareaRef.current?.value;

		if (comment && comments) {
			const newComment = {
				author: userName,
				comment: comment,
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

	return (
		<>
			<input type="checkbox" id="my-modal-6" className="modal-toggle" checked readOnly />
			<div className="modal ">
				<div className="modal-box relative max-w-3xl">
					<label
						htmlFor={`${clickedPost?.createdAt}-${clickedPost?.uid}`}
						className="btn btn-sm btn-circle absolute right-2 top-2"
						onClick={onClose}
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
							</div>
						</div>
						<div className="card-body max-w-3xl gap-5">
							{isLogin && (
								<div className="flex gap-2">
									<span className="font-bold">{userName}</span>
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
											<div key={v4()} className="flex gap-1">
												<span className="font-bold">{item.author}</span>
												<div
													id={item.createdAt.toString()}
													className={`comment pl-1 break-all ${editboxState ? "hidden" : "block"}`}
												>
													<span className="inline-block">{item.comment}</span>
													{item.author === userName && (
														<span className="pl-1">
															<button className="btn btn-primary btn-xs">Edit</button>
															<button className="btn btn-xs ml-1">delete</button>
														</span>
													)}
												</div>
												<div
													id={`${item.createdAt.toString()}Edit`}
													className={`pl-1 break-all ${editboxState ? "block" : "hidden"}`}
												>
													<textarea className="border-2 resize-none w-full" />
													<div className="pl-1">
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
		</>
	);
};
