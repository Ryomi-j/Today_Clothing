import { ImageFrame } from "../components/common/ImageFrame";
import { Modal } from "../components/common/Modal";

export const Post = () => {
	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto w-4/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-5xl text-center pt-5 pb-5">Ryomi’s Today's Clothes</h2>
				<section className="flex">
					<ImageFrame content="Mon" hashtag="#서울 #흐림" deleteBtn={true} />
					<div className="card-body">
						<div className="flex gap-1">
							<span className="font-bold">Angela</span>
							<p className="pl-1">오늘 춥나요?</p>
							<button className="btn btn-primary btn-xs">Edit</button>
							<button className="btn btn-xs">delete</button>
						</div>
					</div>
				</section>
			</div>
			<Modal content="정말 삭제하시겠습니까?" btnContent="Yes" link="talk" btnContent2="No" />
		</div>
	);
};
