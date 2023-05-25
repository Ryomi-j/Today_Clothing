import { Link } from "react-router-dom";
import { EmptyImageFrame, ImageFrame } from "../components/common/ImageFrame";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../store/user";
import { postData, nextWeekUserPost, Post, getSelectedPostRef, deleteImg } from "../store/post";
import { useEffect, useState } from "react";
import { useWeekDates } from "../utils/useWeekDates";
import { Modal } from "../components/common/Modal";
import { updateDoc } from "firebase/firestore";

const Closet = () => {
	const user = useRecoilValue(userInfo);
	const userUid = user && user.uid;
	const postItems = useRecoilValue(postData);
	const [postArr, setPostArr] = useRecoilState(nextWeekUserPost);
	const [clickedPost, setClickedPost] = useState<Post>();
	const weekDates = useWeekDates();

	useEffect(() => {
		const newPostArr = [...postArr];
		weekDates.forEach((date, i) => {
			postItems.forEach((post) => {
				if (post.uid === userUid && date.getTime() === post.date) {
					newPostArr[i] = post;
				}
			});
		});
		setPostArr(newPostArr);
	}, [postItems, weekDates, setPostArr]);

	const deletePost = () => {
		if (clickedPost) {
			deleteImg(clickedPost?.imgUrl);
			getSelectedPostRef(clickedPost).then(async (postRef) => {
				await updateDoc(postRef, { imgUrl: "" });
			});
			const idx = postArr.findIndex((post) => post.id === clickedPost.id);
			const newPostArr = [...postArr];
			newPostArr[idx] = { ...postArr[idx], imgUrl: "" };
			setPostArr(newPostArr);
		}
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
			<Modal content="해당 게시물을 삭제하시겠습니까?" btnContent="OK" btnContent2="Cancel" handleClick={deletePost} />
		</div>
	);
};

export default Closet;