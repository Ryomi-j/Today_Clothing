import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRecoilValue } from "recoil";
import { Post } from "../store/post";
import { useState } from "react";
import { userInfo } from "../store/user";
import { PostDetailModal } from "../components/PostDetailModal";
import { infiniteScroll } from "../utils/infiniteScroll";
import BarLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

const Talk = () => {
	const user = useRecoilValue(userInfo);
	const isLogin = localStorage.getItem('isLogin') === null ? false : JSON.parse(localStorage.getItem('isLogin') || '')
	const [posts, setPosts] = useState<Post[] | []>([]);
	const [clickedPost, setClickedPost] = useState<Post | undefined>(undefined);
	const [modalState, setModalState] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	infiniteScroll({ setPosts, posts, setIsLoading });

	const handleCloseModal = () => {
		setModalState(false);
	};

	const setNewData = (posts: Post[]) => {
		setPosts(posts);
	};

	return (
		<div className="flex flex-col justify-center m-auto min-h-[calc(100vh-3.3rem)] max-w-[1024px] pt-16 bg-base-200">
			<Carousel
				autoPlay
				showThumbs={false}
				interval={6000}
				showStatus={false}
				infiniteLoop={true}
				className="flex justify-center max-w-screen-lg max-h-[600px] !important"
			>
				<Link to="/talk">
					<div className="overflow-hidden">
						<div className="detail flex flex-col gap-1 sm:gap-4 items-center p-0.5 xs:p-2 md:p-4 text-left text-xs ">
							<p className="text-red-600 md:font-medium text-sm xs:text-2xl font-medium md:text-4xl">Early Bird Sale</p>
							<p className="text-xs xs:text-base md:text-lg">여름상품, 신상할인</p>
						</div>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fyoung-woman-gfdde5ca04_1920.jpg?alt=media&token=cd90a93e-4db0-47f3-8249-ae1f8e6a4a97"
							alt="summer sale AD"
						/>
					</div>
				</Link>
				<Link to="/talk">
					<div>
						<div className="detail flex flex-col gap-1 sm:gap-4 items-center p-0.5 xs:p-2 md:p-4 text-left text-xs ">
							<p className="text-red-600 md:font-medium text-sm xs:text-2xl font-medium md:text-4xl">Big Sale</p>{" "}
							<p className="text-xs xs:text-base md:text-lg">봄 상품 80% sale</p>
						</div>
						<img
							src="https://firebasestorage.googleapis.com/v0/b/today-clothing.appspot.com/o/add%2Fman-g97c9fcec5_1920.jpg?alt=media&token=1ca0e230-7b37-48d6-a4f8-9738524168f6"
							alt="spring sale AD"
						/>
					</div>
				</Link>
			</Carousel>
			{isLoading && (
				<BarLoader
					color="#cc36d7"
					size={70}
					aria-label="BarLoader Spinner"
					data-testid="loader"
					className="fixed bottom-5 right-1/2 z-10"
				/>
			)}
			<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 my-10 justify-center items-center max-w-screen-2xl">
				{posts?.map((post, idx) => {
					return (
						<label
							key={idx}
							id={`${idx}/${post.createdAt}`}
							htmlFor={`${post.createdAt}-${post.uid}`}
							className="card card-compact bg-base-100 shadow-xl cursor-pointer h-80"
							onClick={() => {
								setClickedPost(post);
								setModalState(true);
							}}
						>
							<figure className="mx-auto mt-5 w-4/5 h-3/5 overflow-hidden object-cover rounded-lg">
								<div
									className="w-full h-full bg-no-repeat bg-cover"
									style={{ backgroundImage: `url(${post.imgUrl})` }}
								></div>
							</figure>
							<div className="card-body flex-row flex-wrap items-center text-center">
								<div className="badge badge-primary badge-outline">#{post.location}</div>
								<div className="badge badge-secondary badge-outline">#{post.weather}</div>
								<div className="badge badge-outline">#{`${post.degree}C°`}</div>
								<div className="badge badge-accent badge-outline">#{`습도_${post.humidity}%`}</div>
								<div className="badge badge-secondary badge-outline">
									#{new Date(post.date).toString().slice(0, 15)}
								</div>
							</div>
						</label>
					);
				})}
			</div>
			{modalState && clickedPost && (
				<PostDetailModal
					clickedPost={clickedPost}
					isLogin={isLogin}
					userName={user?.name ?? ""}
					isChecked={true}
					onClose={handleCloseModal}
					posts={posts}
					setPosts={setNewData}
				/>
			)}
		</div>
	);
};

export default Talk;
