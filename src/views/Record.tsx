import { Link } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { Post, deletePost, userPost } from "../store/post";
import { ImageFrame } from "../components/common/ImageFrame";
import { RiEmotionSadLine } from "react-icons/ri";
import { useWeekDates } from "../utils/useWeekDates";
import { Modal } from "../components/common/Modal";

export const Record = () => {
	const [userPosts, setUserPosts] = useRecoilState(userPost);
	const days = ["일", "월", "화", "수", "목", "금", "토"];
	const nextMonday = useWeekDates()[0];
	const [userRecords, setUserRecords] = useState<Post[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [clickedPost, setClickedPost] = useState<Post>();

	useEffect(() => {
		setIsLoading(true);
		if (userPosts.length > 0) {
			const posts = userPosts.filter((post) => post.date !== undefined && post.date < Number(nextMonday));
			setUserRecords(posts);
			setIsLoading(false);
		}
	}, [userPost, userPosts]);

	const handleDeletePost = () => {
		if (clickedPost) deletePost({ clickedPost, userPosts, setUserPosts });
	};

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			{userRecords.length === 0 ? (
				<div className="card gap-5 my-8 mx-auto max-w-2/5 bg-base-100 shadow-xl p-7">
					<h2 className="text-2xl sm:text-4xl font-extrabold text-center pt-5 pb-5">Record</h2>
					<div className="grid xs:grid-cols-2 gap-6 justify-center justify-items-center">
						<div className="flex items-center gap-2 mt-10 font-extrabold">
							No clothing records found <RiEmotionSadLine />
						</div>
					</div>
					<div className="flex flex-row-reverse mt-7">
						<Link to="/closet">
							<button className="btn">
								<MdNavigateBefore className="text-xl" /> back
							</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="card gap-5 my-8 mx-auto min-w-2/5 min-h-min bg-base-100 shadow-xl p-7">
					<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Record</h2>
					<div className="grid xs:grid-cols-2 gap-6 justify-center justify-items-center">
						{userRecords.map((post, idx) => {
							let timeStamp = new Date(Number(post.date));
							return (
								<ImageFrame
									key={idx}
									content={`${timeStamp.getFullYear()}년 ${timeStamp.getMonth() + 1}월 ${timeStamp.getDate()}일 ${
										days[timeStamp.getDay()]
									}요일${
										post.humidity !== undefined && post.weather ? `\n습도 ${post.humidity}% ${post.weather}` : ""
									}`}
									post={post}
									date={timeStamp}
									prevPage={"record"}
									deleteBtn={true}
									handleClickPost={setClickedPost}
								/>
							);
						})}
					</div>
					<Modal
						content="해당 게시물을 삭제하시겠습니까?"
						btnContent="OK"
						btnContent2="Cancel"
						handleClick={handleDeletePost}
					/>
				</div>
			)}
		</div>
	);
};
