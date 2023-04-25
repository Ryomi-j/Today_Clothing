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
					<div className="text-right">
						<button className="btn text-right">Share</button>
					</div>
				</div>
			</div>
		</div>
	);
};
