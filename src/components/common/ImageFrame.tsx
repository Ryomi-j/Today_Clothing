import { Link } from "react-router-dom";

interface ImageFrameDataType {
	content: string;
	editBtn?: boolean;
}

export const ImageFrame = ({ content }: ImageFrameDataType) => {
	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<figure className="w-96 h-96">
				<img src="https://ribino.jp/web/product/big/202010/ef5634e25af800765b9dd263bceb39f8.gif" alt="clothing image" />
			</figure>
			<div className="card-body h-28">
				<h3 className="card-title justify-center">{content}</h3>
				<div className="card-actions justify-end">
					<Link to="/editCloset">
						<button className="btn btn-primary ">edit</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export const EmptyImageFrame = ({ content }: ImageFrameDataType) => {
	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<Link to="/editCloset">
				<figure className="w-96 h-96 bg-base-200 cursor-pointer rounded-t-2xl">
					<div className="text-7xl">+</div>
				</figure>
			</Link>
			<div className="card-body h-28">
				<h3 className="card-title justify-center">{content}</h3>
			</div>
		</div>
	);
};
