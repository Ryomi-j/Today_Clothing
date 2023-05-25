import { useRecoilValue } from "recoil";
import { Modal } from "../components/common/Modal";
import { BiShareAlt } from "react-icons/bi";
import { WeatherProps, defaultWeatherData, weatherData } from "../api/weatherApi";
import { useEffect, useState } from "react";
import { DefaultPost, Post, defaultData, userPost } from "../store/post";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "../firebase";

const TodayClothes =  () => {
	const [weather, setWeather] = useState<WeatherProps>(defaultWeatherData)
	const defaultImgs = useRecoilValue(defaultData);
	const [today, setToday] = useState(new Date());
	const [todayPost, setTodayPost] = useState<Post[] | DefaultPost[] | undefined>(undefined);

	useEffect(()=> {
		const getWeatherInfo = async () => {
			const weatherInfo = await weatherData()
			setWeather(weatherInfo)
		}
		getWeatherInfo()
	}, [])

	const userPosts: Post[] = useRecoilValue(userPost);
	let currentPost: Post[] | undefined = userPosts.filter((post) => {
		if (!post.date) {
			return false;
		}
		return new Date(+post.date)?.toString().slice(0, 15) === today.toString().slice(0, 15);
	});

	const days = ["일", "월", "화", "수", "목", "금", "토"];
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let date = today.getDate();
	let day = today.getDay();
	let posts: Post[] | DefaultPost[] | undefined;

	useEffect(() => {
		if (currentPost && currentPost.length === 0) {
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
				default:
					posts = defaultImgs.filter((img) => img.degree >= 28);
					break;
			}
		}
	}, [userPosts, weather]);

	useEffect(() => {
		setToday(new Date());
		localStorage.setItem("userPosts", JSON.stringify(userPosts));

		if (currentPost && currentPost.length > 0) {
			setTodayPost(currentPost);
		} else {
			setTodayPost(posts);
		}
	}, []);

	if (todayPost === undefined) {
		return <div>Loading...</div>;
	}

	const makePost = async () => {
		if (todayPost && todayPost.length > 0) {
			const selectedPost = await getDocs(query(collection(db, "post"), where("imgUrl", "==", todayPost[0].imgUrl)));
			selectedPost.forEach((doc) => {
				const postRef = doc.ref;
				const postData = doc.data();
				if (postData.isPost) return alert("이미 등록된 게시물입니다.");
				else
					setDoc(
						postRef,
						{
							...postData,
							isPost: true,
							createdAt: new Date().getTime(),
							location: weather.location,
							humidity: weather.humidity,
							weather: weather.weather,
							degree: weather.temp,
						},
						{ merge: true }
					);
			});
		}
	};

	return (
		<div className="flex w-screen min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card m-auto w-fit h-auto bg-base-100 shadow-xl xxxs:p-5 sm:py-7 sm:px-10">
				<h2 className="xxxs:text-xl xs:text-4xl font-extrabold text-center xxxs:p-2 xs:py-5">Today's Clothes</h2>
				{todayPost.length === 1 ? (
					todayPost.map((post) => {
						return (
							<figure
								key={post.id}
								className=" md:w-96 md:h-96 mx-auto border-2 rounded-md object-contain overflow-hidden"
							>
								<img src={post.imgUrl} alt={`${today?.toString().slice(0, 15)} clothing image`} className="w-full" />
							</figure>
						);
					})
				) : (
					<Carousel
						autoPlay
						showThumbs={false}
						interval={6000}
						showStatus={false}
						infiniteLoop={true}
						className="carousel-container w-96 h-96 mx-auto border-2 rounded-md"
					>
						{todayPost.map((post) => {
							return (
								<figure key={post.id} className="w-96 h-96 mx-auto border-2 rounded-b-sm">
									<img src={post.imgUrl} alt={`default data - ${today?.toString().slice(0, 15)}`} />
								</figure>
							);
						})}
					</Carousel>
				)}
				<div className="card-body p-1">
					<p className="mt-8 mb-8 xxs:text-xs xs:text-xl text-center">
						{year}년 {month}월 {date}일 {days[day]}요일 <br />
						습도 {weather.humidity}% 온도 {weather.temp}C° {weather.weather}
					</p>
					{todayPost.length === 1 && (
						<div className="flex flex-row-reverse">
							<label
								htmlFor="my-modal-6"
								className="btn btn-primary xxxs:btn-sm xxxs:w-full xxs:justify-center xxs:p-0 xs:w-1/3"
							>
								<span className="xxxs:hidden sm:block">Share</span>
								<BiShareAlt className="xxs:p-0 pl-2 xxs:text-xs xs:text-xl" />
							</label>
						</div>
					)}
				</div>
			</div>
			<Modal
				content="오늘 당신의 의상을 공유하시겠습니까?"
				btnContent="OK"
				btnContent2="Cancel"
				handleClick={makePost}
			/>
		</div>
	);
};

export default TodayClothes;
