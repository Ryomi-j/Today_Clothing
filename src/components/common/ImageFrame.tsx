interface ImageFrameDataType {
	content: string;
	editBtn?: boolean;
	cancelBtn?: boolean;
	deleteBtn?: boolean;
	hashtag?: string;
}

export const ImageFrame = ({ content, hashtag, editBtn, cancelBtn, deleteBtn }: ImageFrameDataType) => {
	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<figure>
				<img src="https://ribino.jp/web/product/big/202010/ef5634e25af800765b9dd263bceb39f8.gif" alt="clothing image" />
			</figure>
			<div className="card-body">
				<h3 className="card-title justify-center">{content}</h3>
				<p>{hashtag}</p>
				<div className="card-actions justify-end">
					{editBtn && <button className="btn btn-primary">edit</button>}
					{cancelBtn && <button className="btn btn-primary">cancel</button>}
					{deleteBtn && <button className="btn btn-primary">delete</button>}
				</div>
			</div>
		</div>
	);
};

export const EmptyImageFrame = ({ content, hashtag, editBtn, cancelBtn, deleteBtn }: ImageFrameDataType) => {
	return (
		<div className="card card-compact w-96 bg-base-100 shadow-xl">
			<figure>
				<img src="http://via.placeholder.com/576x576 " alt="empty image" />
			</figure>
			<div className="card-body h-32">
				<h3 className="card-title justify-center">{content}</h3>
				<p>{hashtag}</p>
				<div className="card-actions justify-end">
					{editBtn && <button className="btn btn-primary">edit</button>}
					{cancelBtn && <button className="btn btn-primary">cancel</button>}
					{deleteBtn && <button className="btn btn-primary">delete</button>}
				</div>
			</div>
		</div>
	);
};
