import { Link } from "react-router-dom";
import { EmptyImageFrame, ImageFrame } from "../components/common/ImageFrame";
import { v4 } from "uuid";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { nextWeekUserPost, userPostState } from "../store/post";
import { useEffect } from "react";
import { useWeekDates } from "../utils/useWeekDates";

const Closet = () => {
	const [postArr, _] = useRecoilState(nextWeekUserPost);
	const weekDates = useWeekDates();
	const userPosts = useRecoilValue(userPostState);
	const getPostData = useRecoilCallback(({ set }) => async () => {
		try {
			set(nextWeekUserPost, userPosts || []);
		} catch (error) {
			console.error(error);
			set(nextWeekUserPost, []);
		}
	});

	useEffect(() => {
		if(postArr.length === 0 || postArr.every(x => !x)) {
			getPostData();
		}
	}, [userPosts])

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto max-w-2/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-2xl sm:text-4xl font-extrabold text-center pt-5 pb-5">Weekly Closet</h2>
				<div className="grid grid-rows-4 xs:grid-cols-2 gap-6 justify-center justify-items-center">
					{postArr.length > 0 ? weekDates.map((_, i) => {
						const date = weekDates[i];
						const content = date ? date.toString().slice(0, 3) : "";
						const post = postArr.find((post) => {
							return post && Number(date) === post.date
						});
						if (post) {
							return <ImageFrame key={v4()} content={content} date={date} src={post.imgUrl} prevPage={'closet'} />;
						} else {
							return <EmptyImageFrame key={v4()} content={content} date={date} prevPage={'closet'} />;
						}
					}) : 
					weekDates.map((date) => <EmptyImageFrame key={v4()} content={""} date={date} prevPage={'closet'} />)
					}
				</div>
				<div className="flex flex-row-reverse mt-7">
					<Link to="/record">
						<button className="btn btn-xs xs:btn-md">Record</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Closet;
