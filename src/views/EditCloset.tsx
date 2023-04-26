import { Link } from "react-router-dom";
import { Modal } from "../components/common/Modal";

export const EditCloset = () => {
	return (
		<div className="flex w-screen min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card m-auto w-fit h-auto bg-base-100 shadow-xl py-7 px-10">
				<h2 className="text-5xl text-center pt-5 pb-5">Edit Weekly Closet</h2>
				<figure className="w-96 h-96 border-2 rounded-md">
					<img src="/vite.svg" alt="Shoes" />
				</figure>
				<div className="card-body">
					<h3 className="mt-8 mb-8 text-xl text-center">Tue</h3>

					<div className="flex flex-row-reverse">
						<label htmlFor="my-modal-6" className="btn btn-primary w-1/3">
							Save
						</label>
						<Link to="/myCloset">
							<button className="btn">Cancel</button>
						</Link>
					</div>
				</div>
			</div>
			<Modal content="내용을 저장하시겠습니까?" btnContent="OK" link="myCloset" btnContent2="No" />
		</div>
	);
};
