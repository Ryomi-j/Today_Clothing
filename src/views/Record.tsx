import { Link } from "react-router-dom";
import { MdNavigateBefore } from "react-icons/md";

export const Record = () => {
	return (
		<div className="flex min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
			<div className="card gap-5 my-8 mx-auto min-w-2/5 bg-base-100 shadow-xl p-7">
				<h2 className="text-4xl font-extrabold text-center pt-5 pb-5">Record</h2>
				<div className="grid grid-rows-4 grid-cols-2 gap-6 justify-center items-center">

				</div>
				<div className="flex flex-row-reverse mt-7">
					<Link to="/closet">
						<button className="btn">
							<MdNavigateBefore className="text-xl" /> back
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
