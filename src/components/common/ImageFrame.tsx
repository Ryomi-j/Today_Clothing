import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedDate } from "../../store/editItem";

interface ImageFrameDataType {
	content: string;
	hashtag?: string;
	deleteBtn?: boolean;
	date?: Date;
}

export const ImageFrame = ({ content, hashtag, deleteBtn, date }: ImageFrameDataType) => {
	const [, setDate] = useRecoilState(selectedDate);

	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<figure className="w-96 h-96 max-w-96 max-h-96">
				<img src="https://ribino.jp/web/product/big/202010/ef5634e25af800765b9dd263bceb39f8.gif" alt="clothing image" />
			</figure>
			<div className="card-body min-h-28">
				<h3 className="card-title justify-center">{content}</h3>
				{hashtag && <p>{hashtag}</p>}
				<div className="flex gap-2 justify-end">
					<div className="card-actions justify-end">
						<Link to="/editCloset">
							{date && (
								<button className="btn btn-primary btn-sm" onClick={() => setDate(date.getTime())}>
									edit
								</button>
							)}
						</Link>
					</div>
					{deleteBtn && (
						<div className="form-control">
							<label htmlFor="my-modal-6" className="btn btn-sm">
								delete
							</label>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const EmptyImageFrame = ({ content, date }: ImageFrameDataType) => {
	const [, setDate] = useRecoilState(selectedDate);

	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<Link to="/editCloset">
				{date && (
					<figure
						className="w-96 h-96 max-w-96 max-h-96 bg-base-200 cursor-pointer rounded-t-2xl"
						onClick={() => setDate(date.getTime())}
					>
						<img src="/addImg.svg" alt="Shoes" className="w-1/4" />
					</figure>
				)}
			</Link>
			<div className="card-body h-28 ">
				<h3 className="card-title justify-center">{content}</h3>
			</div>
		</div>
	);
};
