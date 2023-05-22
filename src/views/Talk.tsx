import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRecoilValue } from "recoil";
import { Post, postData } from "../store/post";
import { useEffect, useState } from "react";

const Talk = () => {
	const postItems = useRecoilValue(postData);
	const [posts, setPosts] = useState<Post[] | undefined>(undefined);
	const [clickedPost, setClickedPost] = useState<Post | undefined>(undefined);

	useEffect(() => {
		const sharedPosts = postItems.filter((post) => post.isPost === true);
		setPosts(sharedPosts);
	}, []);

	return (
		<div className="flex flex-col items-center min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<Carousel
				autoPlay
				showThumbs={false}
				interval={6000}
				showStatus={false}
				infiniteLoop={true}
				className="flex justify-center max-w-screen-2xl"
			>
				<div className="overflow-hidden">
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
			<div className="grid grid-cols-3 gap-6 my-10 justify-center items-center max-w-screen-2xl">
				{posts?.map((post, idx) => {
					return (
						<label
						id={`${idx}/${post.createdAt}`}
							htmlFor={`${post.createdAt}-${post.uid}`}
							className="card card-compact bg-base-100 shadow-xl cursor-pointer block"
							onClick={() => {
								setClickedPost(post);
							}}
						>
							<figure className="mx-5 mt-5 max-h-72 overflow-hidden object-cover">
								<img src={post.imgUrl} alt={`${post.uid}-${post.date}-clothing info`} className="rounded-xl" />
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center">
								<div className="badge badge-primary badge-outline">#{post.location}</div>
								<div className="badge badge-secondary badge-outline">#{post.weather}</div>
								<div className="badge badge-outline">#{`${post.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${post.humidity}%`}</div>
							</div>
						</label>
					);
				})}
			</div>
		</div>
	);
};

export default Talk