import { Link } from "react-router-dom";

type ModalProps = {
	content: string;
	link?: string;
	btnContent: string;
	btnContent2?: string;
	checked?: boolean;
	handleClick?: React.MouseEventHandler<HTMLLabelElement>;
};

export const Modal = ({ content, link, btnContent, btnContent2, checked, handleClick }: ModalProps) => {
	return (
		<>
			<input type="checkbox" id="my-modal-6" className="modal-toggle" checked={checked} />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">{content}</h3>
					<div className="modal-action">
						{link && !btnContent2 && !handleClick && (
							<Link to={`/${link}`}>
								<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
									{btnContent}
								</label>
							</Link>
						)}
						{!link && !btnContent2 && !handleClick && (
							<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
								{btnContent}
							</label>
						)}
						{link && btnContent2 && !handleClick && (
							<>
								<Link to={`/${link}`}>
									<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
										{btnContent}
									</label>
								</Link>
								<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
									{btnContent2}
								</label>
							</>
						)}
						{!link && btnContent2 && handleClick && (
							<>
								<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre" onClick={handleClick}>
									{btnContent}
								</label>
								<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
									{btnContent2}
								</label>
							</>
						)}
						{!link && btnContent2 && !handleClick && (
							<>
								<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
									{btnContent}
								</label>
								<label htmlFor="my-modal-6" className="btn btn-sm whitespace-pre">
									{btnContent2}
								</label>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
