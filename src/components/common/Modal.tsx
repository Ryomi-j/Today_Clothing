import { Link } from "react-router-dom";

type ModalProps = {
	content: string;
	link?: string;
	btnContent: string;
	btnContent2?: string;
};

export const Modal = ({ content, link, btnContent, btnContent2 }: ModalProps) => {
	return (
		<>
			<input type="checkbox" id="my-modal-6" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">{content}</h3>
					<div className="modal-action">
						{link && !btnContent2 && (
							<Link to={`/${link}`}>
								<label htmlFor="my-modal-6" className="btn whitespace-pre">
									{btnContent}
								</label>
							</Link>
						)}
						{!link && !btnContent2 && (
							<label htmlFor="my-modal-6" className="btn whitespace-pre">
								{btnContent}
							</label>
						)}
						{link && btnContent2 && (
							<>
								<Link to={`/${link}`}>
									<label htmlFor="my-modal-6" className="btn whitespace-pre">
										{btnContent}
									</label>
								</Link>
								<label htmlFor="my-modal-6" className="btn whitespace-pre">
									{btnContent2}
								</label>
							</>
						)}
						{!link && btnContent2 && (
							<>
								<label htmlFor="my-modal-6" className="btn whitespace-pre">
									{btnContent}
								</label>
								<label htmlFor="my-modal-6" className="btn whitespace-pre">
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
