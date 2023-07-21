import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedDate } from "../../store/date";
import { Post } from "../../store/post";

interface ImageFrameDataType {
	content: string;
	post?: Post;
	deleteBtn?: boolean;
	date?: Date;
	prevPage?: string;
	handleClickPost?: React.Dispatch<React.SetStateAction<Post | undefined>>;
}

export const ImageFrame = ({ content, post, deleteBtn, date, prevPage, handleClickPost }: ImageFrameDataType) => {
	const [, setDate] = useRecoilState(selectedDate);

	return (
		<div className="card card-compact w-full h-full bg-base-100 shadow-xl">
			<figure className="w-full h-56 md:h-96 bg-base-200 cursor-pointer rounded-t-2xl overflow-hidden object-cover">
				<img src={post?.imgUrl} alt={`${date?.toString().slice(0, 15)} clothing image`} />
			</figure>
			<div className="h-20 md:h-28 p-3">
				<h3 className="card-title justify-center gap-1 text-sm md:text-lg whitespace-pre-wrap text-center">
					{content}
				</h3>
				<div className="flex md:gap-2 justify-end items-center gap-1 mr-2 text-sm md:text-base">
					<div className="card-actions justify-end md:mt-0">
						<Link to={`/editPost?prevPage=${prevPage}&content=${encodeURIComponent(content)}`}>
							{date && (
								<button
									className="flex items-center font-medium rounded-md leading-none"
									onClick={() => setDate(date.getTime())}
								>
									<span className="bg-slate-200 p-1 rounded-lg leading-none">EDIT</span>
								</button>
							)}
						</Link>
					</div>
					{deleteBtn && handleClickPost && post && (
						<div className="form-control w-fit h-fit" onClick={() => handleClickPost(post)}>
							<label
								htmlFor="my-modal-6"
								className="flex items-center font-medium rounded-md leading-none"
							>
								<span className="bg-slate-500 text-white p-1 rounded-lg leading-none">DELETE</span>
							</label>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const EmptyImageFrame = ({ content, date, prevPage }: ImageFrameDataType) => {
	const [, setDate] = useRecoilState(selectedDate);

	return (
		<div className="card card-compact w-full h-full bg-base-100 shadow-xl">
			<Link to={`/editPost?prevPage=${prevPage}&content=${encodeURIComponent(content)}`}>
				{date && (
					<figure
					className="w-80 xs:w-full h-56 md:h-96 bg-base-200 cursor-pointer rounded-t-2xl overflow-hidden object-cover"
						onClick={() => setDate(date.getTime())}
					>
						<img src="/addImg.svg" alt="No image data" className="w-1/4" />
					</figure>
				)}
			</Link>
			<div className="h-20 xl:h-28 md:p-3">
				<h3 className="card-title justify-center gap-1 leading-5 text-sm md:text-sm xl:text-lg whitespace-pre-wrap text-center">{content}</h3>
			</div>
		</div>
	);
};
