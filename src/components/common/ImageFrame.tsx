import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedDate } from "../../store/editItem";

interface ImageFrameDataType {
	content: string;
	src?: string;
	hashtag?: string;
	deleteBtn?: boolean;
	date?: Date;
	prevPage?: string;
}

export const ImageFrame = ({ content, src, deleteBtn, date, prevPage }: ImageFrameDataType) => {
	const [, setDate] = useRecoilState(selectedDate);

	return (
		<div className="card card-compact w-32 md:w-52 md:h-52 xl:w-96 xl:h-auto bg-base-100 shadow-xl">
			<figure className="w-32 h-28 md:w-52 md:h-40 xl:w-96 xl:h-96 max-w-96 max-h-96 bg-base-200 cursor-pointer rounded-t-2xl object-contain">
				<img src={src} alt={`${date?.toString().slice(0, 15)} clothing image`} className="h-"/>
			</figure>
			<div className=" md:h-20 xl:h-28 md:p-3">
				<h3 className="card-title justify-center gap-1 leading-3 text-[10px] md:text-sm xl:text-lg whitespace-pre-wrap text-center">
					{content}
				</h3>
				<div className="flex gap-2 justify-end">
					<div className="card-actions justify-end mt-[-0.3rem] xl:mt-0">
						<Link to={`/editPost?prevPage=${prevPage}&content=${encodeURIComponent(content)}`}>
							{date && (
								<button
									className="bg-primary text-white font-medium rounded-md text-[7px] p-1 mr-2 leading-none md:btn md:btn-primary text-xs md:btn-xs xl:btn-sm xl:p-2"
									onClick={() => setDate(date.getTime())}
								>
									EDIT
								</button>
							)}
						</Link>
					</div>
					{deleteBtn && (
						<div className="form-control">
							<label htmlFor="my-modal-6" className="btn btn-xs">
								delete
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
		<div className="card card-compact w-32 md:w-52 md:h-52 xl:w-96 xl:h-auto bg-base-100 shadow-xl">
			<Link to={`/editPost?prevPage=${prevPage}&content=${encodeURIComponent(content)}`}>
				{date && (
					<figure
						className="w-32 h-28 md:w-52 md:h-40 xl:w-96 xl:h-96 max-w-96 max-h-96 bg-base-200 cursor-pointer rounded-t-2xl"
						onClick={() => setDate(date.getTime())}
					>
						<img src="/addImg.svg" alt="No image data" className="w-1/4" />
					</figure>
				)}
			</Link>
			<div className="card-body h-10 p-0 md:p-1 md:h-28">
				<h3 className="card-title justify-center text-sm xl:text-md">{content}</h3>
			</div>
		</div>
	);
};
