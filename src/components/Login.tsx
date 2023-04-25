import { Modal } from "./common/Modal";

export const Login = () => {
	return (
		<>
			<div className="hero min-h-screen bg-base-200">
				<div className="card flex-shrink-0 w-3/5 h-4/5 shadow-2xl bg-base-100">
					<div className="card-body p-20 gap-5">
						<h2 className="text-center text-5xl font-bold">Login</h2>
						<div className="form-control flex-row justify-center mt-16 ">
							<label className="label w-24  pr-5">
								<span className="label-text font-bold">ID</span>
							</label>
							<input type="text" placeholder="id" className="input input-bordered" />
						</div>
						<div className="form-control  flex-row justify-center">
							<label className="label w-24 pr-3 ">
								<span className="label-text font-bold">PW</span>
							</label>
							<input type="text" placeholder="password" className="input input-bordered" />
						</div>
						<div className="form-control mt-6 items-center">
							<label htmlFor="my-modal-6" className="btn btn-primary w-1/3 m-auto">
								Login
							</label>
						</div>
						<label className="label justify-end mt-3">
							<a href="#" className="label-text-alt link link-hover mt-2 text-base">
								Create Account
							</a>
						</label>
						<div className="divider"></div>
						<div className="flex flex-col gap-7">
							<p className="text-center mt-4">Social login can save your valuable time.</p>
							<button className="btn w-1/3 m-auto">Google</button>
						</div>
					</div>
				</div>
			</div>
			<Modal content="아이디를 확인하세요" />
		</>
	);
};
