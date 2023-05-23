import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRecoilValue } from "recoil";
import { Post, postData } from "../store/post";
import { useEffect, useState } from "react";
import { userInfo, userState } from "../store/user";
import { PostDetailModal } from "../components/PostDetailModal";

const Talk = () => {
	const postItems = useRecoilValue(postData);
	const user = useRecoilValue(userInfo);
	const isLogin = useRecoilValue(userState);
	const [posts, setPosts] = useState<Post[] | []>([]);
	const [clickedPost, setClickedPost] = useState<Post | undefined>(undefined);
	const [modalState, setModalState] = useState(false);

	useEffect(() => {
		const savedPostData = localStorage.getItem('posts')
		const sharedPosts = postItems.filter((post) => post.isPost === true);
		savedPostData !== null ? setPosts(JSON.parse(savedPostData)) : setPosts(sharedPosts);
	}, []);

	const handleCloseModal = () => {
		setModalState(false);
	};

	const setNewData = (posts : Post[]) => {
		setPosts(posts)
		localStorage.setItem('posts', JSON.stringify(posts))
	};

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
							key={idx}
							id={`${idx}/${post.createdAt}`}
							htmlFor={`${post.createdAt}-${post.uid}`}
							className="card card-compact bg-base-100 shadow-xl cursor-pointer block"
							onClick={() => {
								setClickedPost(post);
								setModalState(true);
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

export default Talk