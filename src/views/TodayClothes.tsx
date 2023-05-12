import { useRecoilValue } from "recoil";
import { Modal } from "../components/common/Modal";
import { BiShareAlt } from "react-icons/bi";
import { weatherData } from "../api/weatherApi";
import { useEffect, useState } from "react";
import { userInfo } from "../store/user";
import { Post, defaultData } from "../store/post";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const TodayClothes = () => {
	const weather = useRecoilValue(weatherData);
	const user = useRecoilValue(userInfo);
	const defaultImgs = useRecoilValue(defaultData);
	const userUid = user && user.uid;
	const userPosts: Post[] = (userUid && JSON.parse(localStorage.getItem(userUid) || "[]")) || [];
	const [today, setToday] = useState(new Date());
	const [todayPost, setTodayPost] = useState<Post[] | undefined>(undefined);
	/* 1684162800000 */
	const days = ["일", "월", "화", "수", "목", "금", "토"];
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let date = today.getDate();
	let day = today.getDay();
	let posts: Post[] | undefined;

	useEffect(() => {
		const todayPost = userPosts.find((item) => item.date === today.getTime());
		if (!todayPost) {
			switch (true) {
				case weather.temp < 4:
					posts = defaultImgs.filter((img) => img.degree < 4);
					break;
				case weather.temp < 9:
					posts = defaultImgs.filter((img) => img.degree >= 4 && img.degree < 9);
					break;
				case weather.temp < 12:
					posts = defaultImgs.filter((img) => img.degree >= 9 && img.degree < 12);
					break;
				case weather.temp < 17:
					posts = defaultImgs.filter((img) => img.degree >= 12 && img.degree < 17);
					break;
				case weather.temp < 20:
					posts = defaultImgs.filter((img) => img.degree >= 17 && img.degree < 20);
					break;
				case weather.temp < 23:
					posts = defaultImgs.filter((img) => img.degree >= 20 && img.degree < 23);
					break;
				case weather.temp < 28:
					posts = defaultImgs.filter((img) => img.degree >= 23 && img.degree < 28);
					break;
				case weather.temp >= 28:
					posts = defaultImgs.filter((img) => img.degree >= 28);
					break;
				default:
					posts = undefined;
					break;
			}
		}
	}, [userPosts, weather]);

	useEffect(() => {
		setToday(new Date());
		setTodayPost(posts);
	}, []);

	if (todayPost === undefined) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex w-screen min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card m-auto w-fit h-auto bg-base-100 shadow-xl py-7 px-10">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Today's Clothes</h2>
				<Carousel
					autoPlay
					showThumbs={false}
					interval={6000}
					showStatus={false}
					infiniteLoop={true}
					className="carousel-container w-96 h-96 mx-auto border-2 rounded-md overflow-hidden object-cover"
				>
					{todayPost.length === 1
						? todayPost.map((post) => {
								return (
									<figure key={post.id} className="w-96 h-96 mx-auto border-2 rounded-md">
										<img src={todayPost[0].imgUrl} alt={`${today?.toString().slice(0, 15)} clothing image`} className="w-full h-full" />
									</figure>
								);
						  })
						: todayPost.map((post) => {
								return (
									<figure key={post.id} className="w-96 h-96 mx-auto border-2 rounded-md">
										<img src={post.imgUrl} alt={`default data - ${today?.toString().slice(0, 15)}`} />
									</figure>
								);
						  })}
				</Carousel>
				<div className="card-body">
					<p className="mt-8 mb-8 text-xl text-center">
						{year}년 {month}월 {date}일 {days[day]}요일 <br />
						습도 {weather.humidity}% 온도{weather.temp}C° {weather.weather}
					</p>
					<div className="flex flex-row-reverse">
						<label htmlFor="my-modal-6" className="btn btn-primary w-1/3">
							Share <BiShareAlt className="pl-2 text-xl" />
						</label>
					</div>
				</div>
			</div>
			<Modal content="오늘 당신의 의상을 공유하시겠습니까?" btnContent="OK" btnContent2="Cancel" />
		</div>
	);
};

export default TodayClothes;
