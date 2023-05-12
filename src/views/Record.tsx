import { Link } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/user";
import { useMemo } from "react";
import { Post } from "../store/post";
import { ImageFrame } from "../components/common/ImageFrame";
import { RiEmotionSadLine } from "react-icons/ri";

export const Record = () => {
	const user = useRecoilValue(userInfo);
	const userUid = user && user.uid;
	const userPosts: Post[] = (userUid && JSON.parse(localStorage.getItem(userUid) || "[]")) || [];
	const days = ["일", "월", "화", "수", "목", "금", "토"];

	const userRecords = useMemo(() => {
		const today = new Date();
		const nextMonday = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + ((1 + 7 - today.getDay()) % 7)
		);
		// 1684594800000
		const posts = userPosts.filter((post) => post.date !== undefined && post.date < 1684594800000);
		// const posts = userPosts.filter((post) => post.date !== undefined && post.date < nextMonday.getTime());
		return posts;
	}, []);

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			{userRecords.length === 0 ? (
				<div className="card gap-5 my-auto mx-auto min-w-2/5 h-80 bg-base-100 shadow-xl p-7">
					<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Record</h2>
					<div className="grid gap-6 mx-6 justify-center items-center">
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
					<div className={`grid grid-cols-2 gap-6 justify-center items-center`}>
						{userRecords.map((post) => {
							let timeStamp = new Date(Number(post.date));
							return (
								<ImageFrame
									content={`${timeStamp.getFullYear()}년 ${timeStamp.getMonth() + 1}월 ${timeStamp.getDate()}일 ${
										days[timeStamp.getDay()]
									}요일\n습도 ${post.humidity}% ${post.weather}`}
									src={post.imgUrl}
									date={timeStamp}
								/>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
};
