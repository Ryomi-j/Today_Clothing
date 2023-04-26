import { Link } from "react-router-dom";
import { Modal } from "../components/common/Modal";

export const EditCloset = () => {
	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-6 mx-auto min-w-2/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-5xl text-center pt-5 pb-5">Edit Weekly Closet</h2>
				<figure className="w-96 h-96 m-auto border-2 rounded-md">
					<img src="/vite.svg" alt="Shoes" />
				</figure>
				<div className="card-body">
					<h3 className=" mb-14 text-4xl text-center">Tue</h3>
					<div className="flex justify-end gap-2">
						<label htmlFor="my-modal-6" className="btn btn-primary">
							Save
						</label>
						<Link to="/closet">
							<button className="btn">Cancel</button>
						</Link>
					</div>
				</div>
			</div>
			<Modal content="내용을 저장하시겠습니까?" btnContent="Yes" link="closet" btnContent2="No" />
		</div>
	);
};
