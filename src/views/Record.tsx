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
	const [clickedPost, setClickedPost] = useState<Post>();
	const degrees = [0, 5, 9, 12, 17, 20, 23, 28];
	const [selectedPostRange, setSelectedPostRange] = useState<Post[]>([]);
	const [posts, setPosts] = useState<Post[]>([])

	useEffect(() => {
		if (userPosts.length > 0) {
			const posts = userPosts.filter((post) => post.date !== undefined && post.date < Number(nextMonday));
			setUserRecords(posts);
			setPosts(posts)
		}
	}, [userPost, userPosts]);

	const handleDeletePost = () => {
		if (clickedPost) deletePost({ clickedPost, userPosts, setUserPosts });
	};

	const handleSeletedDegree = (idx: number) => {
		const posts = userRecords.filter((post) => post.degree &&  post.degree >= degrees[idx] && post.degree < degrees[idx + 1]);
		setPosts(posts)
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
					<div className="form-control w-full">
						<div className="input-group input-group-xs justify-end">
							<select
								className="select select-bordered select-sm"
								style={{ borderRadius: "20px" }}
								onChange={(e) => handleSeletedDegree(e.target.selectedIndex - 1)}
							>
								<option className="text-center" disabled selected>
									Select degree Range
								</option>
								<option className="text-center" value={0}>
									temp {"<"} 5C°
								</option>
								<option className="text-center" value={1}>
									5C° {"≤"} temp {"<"} 9C°
								</option>
								<option className="text-center" value={9}>
									9C° {"≤"} temp {"<"} 12C°
								</option>
								<option className="text-center" value={12}>
									12C° {"≤"} temp {"<"} 17C°
								</option>
								<option className="text-center" value={17}>
									17C° {"≤"} temp {"<"} 20C°
								</option>
								<option className="text-center" value={20}>
									20C° {"≤"} temp {"<"} 23C°
								</option>
								<option className="text-center" value={23}>
									23C° {"≤"} temp {"<"} 28C°
								</option>
								<option className="text-center" value={28}>
									temp {"<"} 28C°
								</option>
							</select>
						</div>
					</div>
					<div className="grid xs:grid-cols-2 gap-6 justify-center justify-items-center">
						{posts.map((post, idx) => {
							let timeStamp = new Date(Number(post.date));
							return (
								<ImageFrame
									key={idx}
									content={`${timeStamp.getFullYear()}년 ${timeStamp.getMonth() + 1}월 ${timeStamp.getDate()}일 ${
										days[timeStamp.getDay()]
									}요일${
										post.humidity !== undefined && post.weather
											? `\n습도 ${post.humidity}% ${post.degree}C° ${post.weather}`
											: ""
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
