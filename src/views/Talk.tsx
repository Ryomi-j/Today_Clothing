import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const Talk = () => {
	return (
		<div className="flex flex-col items-center w-screen min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<Carousel
				autoPlay
				showThumbs={false}
				interval={6000}
				showStatus={false}
				infiniteLoop={true}
				className="flex justify-center max-w-1500px"
			>
				<div>
					<div className="detail p-4 text-left text-4xl">
						<p className="text-red-600 text-4xl">Early Bird Sale</p>다가온 여름, 먼저 준비하세요
					</div>
					<img src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fyoung-woman-gfdde5ca04_1920.jpg?alt=media&token=cd90a93e-4db0-47f3-8249-ae1f8e6a4a97" />
				</div>
				<div>
					<div className="detail p-4 text-left text-4xl">
						<p className="text-red-600 text-4xl">Big Sale</p> 봄 상품 80% sale
					</div>
					<img src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fman-g97c9fcec5_1920.jpg?alt=media&token=1ca0e230-7b37-48d6-a4f8-9738524168f6" />
				</div>
			</Carousel>
			<div></div>
		</div>
	);
};
