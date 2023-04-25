type ModalProps = {
	content: string;
};

export const Modal = ({ content }: ModalProps) => {
	return (
		<>
			<input type="checkbox" id="my-modal-6" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<h3 className="font-bold text-lg">{content}</h3>
					<div className="modal-action">
						<label htmlFor="my-modal-6" className="btn">
							Yay!
						</label>
					</div>
				</div>
			</div>
		</>
	);
};
