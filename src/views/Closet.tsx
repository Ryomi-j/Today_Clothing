import { Link } from "react-router-dom";
import { EmptyImageFrame, ImageFrame } from "../components/common/ImageFrame";
import { v4 } from "uuid";
import { useRecoilValue } from "recoil";
import { userInfo } from "../store/user";
import { postData } from "../store/post";
import { useEffect, useMemo, useRef, useState } from "react";

export const Closet = () => {
	const user = useRecoilValue(userInfo);
	const userUid = user && user.uid;
	const postItems = useRecoilValue(postData);
	const [postArr, setPostArr] = useState(new Array(7).fill(null));
	const postArrRef = useRef(postArr);

	const today = useMemo(() => new Date(), []);
	const nextMonday = useMemo(
		() => new Date(today.getFullYear(), today.getMonth(), today.getDate() + ((1 + 7 - today.getDay()) % 7)),
		[today]
	);
	
	const weekDates: Date[] = useMemo(() => {
		const dates = [];
		for (let i = 0; i < 7; i++) {
			const date = new Date(nextMonday);
			date.setDate(nextMonday.getDate() + i);
			dates.push(date);
		}
		return dates;
	}, [nextMonday]);

	useEffect(() => {
		const newPostArr = [...postArrRef.current];
		weekDates.forEach((date, i) => {
			postItems.forEach((post) => {
				if (post.uid === userUid && date.getTime() === post.date) {
					newPostArr[i] = post;
				}
			});
		});
		postArrRef.current = newPostArr;
		setPostArr(newPostArr);
	}, [postItems, userUid, weekDates]);

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto min-w-2/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Your Weekly Closet</h2>
				<div className="grid grid-rows-4 grid-cols-2 gap-6 justify-center items-center">
					{postArr.map((post, i) => {
						if (post === null) {
							return <EmptyImageFrame key={v4()} content={weekDates[i].toString().slice(0, 3)} date={weekDates[i]} />;
						} else {
							return (
								<ImageFrame
									key={v4()}
									content={weekDates[i].toString().slice(0, 3)}
									date={weekDates[i]}
									src={post.imgUrl}
								/>
							);
						}
					})}
				</div>
				<div className="flex flex-row-reverse mt-7">
					<Link to="/record">
						<button className="btn">Record</button>
					</Link>
				</div>
			</div>
			{/* <Modal content="오늘 당신의 의상을 공유하시겠습니까?" btnContent="OK" btnContent2="Cancel"/> */}
		</div>
	);
};
