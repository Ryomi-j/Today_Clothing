import { Modal } from "../components/common/Modal";

export const TodayClothes = () => {
	return (
		<div className="flex w-screen min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card  gap-5 m-auto w-3/5 h-4/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-5xl text-center pt-5 pb-5">Today's Clothes</h2>
				<figure className="w-full h-72 border-2 rounded-md">
					<img src="/vite.svg" alt="Shoes" />
				</figure>
				<div className="card-body">
					<button className="btn m-auto gap-1">
						Next
						<svg
							fill="currentColor"
							stroke-width="0"
							viewBox="0 0 24 24"
							height="1em"
							width="1em"
							xmlns="http://www.w3.org/2000/svg"
						>
							<polyline fill="none" stroke="white" stroke-width="2" points="7 2 17 12 7 22"></polyline>
						</svg>
					</button>
					<p className="mt-8 mb-8 text-xl text-center">2023년 4월 24일 월요일 15도 흐림</p>
					<label htmlFor="my-modal-6" className="btn btn-primary w-1/3 m-auto">
						Share
					</label>
				</div>
			</div>
			<Modal content="오늘 당신의 의상을 공유하시겠습니까?" btnContent="OK" btnContent2="Cancel"/>
		</div>
	);
};
