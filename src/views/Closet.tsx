import { Link } from "react-router-dom";
import { EmptyImageFrame, ImageFrame } from "../components/common/ImageFrame";
import { v4 } from "uuid";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "../store/user";
import { postData, userPost } from "../store/post";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { DateTime } from "luxon";

const Closet = () => {
	const user = useRecoilValue(userInfo);
	const userUid = user && user.uid;
	const postItems = useRecoilValue(postData);
	const [postArr, setPostArr] = useRecoilState(userPost);
	const [nextMonday, setNextMonday] = useState<Date | undefined>(undefined);
	const [weekDates, setWeekDates] = useState<Date[]>([]);

	useEffect(() => {
		const getWeekDates = async () => {
		  const savedMonday = (await getDoc(doc(db, "next_Monday", "Monday"))).data();
		  const today = new Date().getTime();
		  if (today >= savedMonday?.Monday) {
			const updatedNextMonday = savedMonday?.Monday
			  ? DateTime.fromMillis(savedMonday.Monday).plus({ weeks: 1 }).toJSDate()
			  : DateTime.local().startOf("week").plus({ weeks: 1 }).toJSDate();
			setNextMonday(updatedNextMonday);
			setDoc(doc(db, "next_Monday", "Monday"), {
			  Monday: updatedNextMonday.getTime(),
			});
		  }
		  if (savedMonday) {
			const weekDate = [];
			const next = nextMonday ?? savedMonday.Monday;
			for (let i = 0; i < 7; i++) {
			  const date = new Date(next);
			  date.setDate(date.getDate() + i);
			  weekDate.push(date);
			}
			setWeekDates(weekDate);
		  }
		};
		getWeekDates();
	  }, []);
	  

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
	}, [postItems, userUid, setPostArr]);

	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto min-w-2/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Your Weekly Closet</h2>
				<div className="grid grid-rows-4 grid-cols-2 gap-6 justify-center items-center">
					{weekDates.map((_, i) => {
						const date = weekDates[i];
						const content = date ? date.toString().slice(0, 3) : "";
						const post = postArr.find((post) => post && Number(date) === post.date);
						if (post) {
							return <ImageFrame key={v4()} content={content} date={date} src={post.imgUrl} />;
						} else {
							return <EmptyImageFrame key={v4()} content={content} date={date} />;
						}
					})}
				</div>
				<div className="flex flex-row-reverse mt-7">
					<Link to="/record">
						<button className="btn">Record</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Closet;