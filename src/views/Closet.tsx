import { Link } from "react-router-dom";
import { EmptyImageFrame, ImageFrame } from "../components/common/ImageFrame";
import { useRecoilState } from "recoil";
import { nextWeekUserPost, Post, userPost, deletePost } from "../store/post";
import { useEffect, useState } from "react";
import { useWeekDates } from "../utils/useWeekDates";
import { Modal } from "../components/common/Modal";

const Closet = () => {
	const [userPosts, setUserPosts] = useRecoilState(userPost);
	const [postArr, setPostArr] = useRecoilState(nextWeekUserPost);
	const [clickedPost, setClickedPost] = useState<Post>();
	const weekDates = useWeekDates();

	useEffect(() => {
		const newPostArr = [...postArr.map((post) => ({ ...post }))];
		weekDates.forEach((date, i) => {
			userPosts.forEach((post) => {
				if (date.getTime() === post.date) {
					newPostArr[i] = { ...post };
				}
			});
		});
		setPostArr(newPostArr);
	}, [userPosts, nextWeekUserPost]);

	const handleDeletePost = () => {
		if (clickedPost) deletePost({ clickedPost, postArr, setPostArr, userPosts, setUserPosts });
	};

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto max-w-2/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-2xl sm:text-4xl font-extrabold text-center pt-5 pb-5">Weekly Closet</h2>
				<div className="grid grid-rows-4 xs:grid-cols-2 gap-6 justify-center justify-items-center">
					{weekDates.map((_, i) => {
						const date = weekDates[i];
						const content = date ? date.toString().slice(0, 3) : "";
						const post = postArr.find((post) => post && Number(date) === post.date);
						if (post && post.imgUrl !== "") {
							return (
								<ImageFrame
									key={i}
									content={content}
									date={date}
									post={post}
									deleteBtn={true}
									handleClickPost={setClickedPost}
									prevPage="closet"
								/>
							);
						} else {
							return <EmptyImageFrame key={i} content={content} date={date} prevPage="closet" />;
						}
					})}
				</div>
				<div className="flex flex-row-reverse mt-7">
					<Link to="/record">
						<button className="btn btn-xs xs:btn-sm xl:btn-md">Record</button>
					</Link>
				</div>
			</div>
			<Modal
				content="해당 게시물을 삭제하시겠습니까?"
				btnContent="OK"
				btnContent2="Cancel"
				handleClick={handleDeletePost}
			/>
		</div>
	);
};

export default Closet;
