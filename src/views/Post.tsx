import { ImageFrame } from "../components/common/ImageFrame";
import { Modal } from "../components/common/Modal";
import { BsFillSendFill } from "react-icons/bs";

export const Post = () => {
	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto bg-base-100 shadow-xl p-7">
				<h2 className="text-4xl font-semibold text-center pt-5 pb-5">Ryomi’s Today's Clothes</h2>
				<section className="flex">
					<ImageFrame content="Mon" hashtag="#서울 #흐림" deleteBtn={true} />
					<div className="card-body w-96 gap-5">
						<div className="flex gap-2">
							<span className="font-bold">Angela</span>
							<div className="flex items-center w-full  border-solid border-2 border-indigo-600 rounded-lg">
								<textarea
									className="textarea w-full focus:outline-none resize-none overflow-auto"
									maxLength={50}
									placeholder="댓글을 입력해주세요."
								></textarea>
								<div className="flex items-center w-6 h-full cursor-pointer">
									<BsFillSendFill className="mr-1" />
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-72 max-h-96 overflow-auto">
							<div className="flex gap-1">
								<span className="font-bold">Angela</span>
								<p className="pl-1">오늘 춥나요?</p>
								<button className="btn btn-primary btn-xs">Edit</button>
								<button className="btn btn-xs">delete</button>
							</div>
						</div>
					</div>
				</section>
			</div>
			<Modal content="정말 삭제하시겠습니까?" btnContent="Yes" link="talk" btnContent2="No" />
		</div>
	);
};
