import { useRecoilValue } from "recoil";
import { Modal } from "../components/common/Modal";
import { BiShareAlt } from "react-icons/bi";
import { weatherData } from "../api/weatherApi";
import { useEffect, useState } from "react";

export const TodayClothes = () => {
	const weather = useRecoilValue(weatherData);
	const [today, setToday] = useState(new Date());
	const days = ["일", "월", "화", "수", "목", "금", "토"];

	useEffect(() => {
		setToday(new Date());
	}, []);
	
	let year = today.getFullYear();
	let month = today.getMonth() + 1;
	let date = today.getDate();
	let day = today.getDay()

	return (
		<div className="flex w-screen min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card m-auto w-fit h-auto bg-base-100 shadow-xl py-7 px-10">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Today's Clothes</h2>
				<figure className="w-96 h-96 mx-auto border-2 rounded-md">
					<img src="/vite.svg" alt="Shoes" />
				</figure>
				<div className="card-body">
					<button className="btn m-auto gap-1 btn-sm">
						Next
						<svg
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polyline fill="none" stroke="white" strokeWidth="2" points="7 2 17 12 7 22"></polyline>
						</svg>
					</button>
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
