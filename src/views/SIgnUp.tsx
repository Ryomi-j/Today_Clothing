import { Modal } from "../components/common/Modal";

export const SignUp = () => {
	return (
		<>
			<div className="hero min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
				<div className="card flex-shrink-0 shadow-2xl bg-base-100">
					<div className="card-body p-14 gap-5">
						<h2 className="text-center text-5xl font-bold">Sign Up</h2>
						<div className="form-control flex-row  mt-16">
							<label htmlFor="id" className="label w-24 justify-end">
								<span className="label-text pr-3 font-bold">ID</span>
							</label>
							<input type="text" id="id" placeholder="id" className="input input-bordered w-52" />
							<button className="btn p-1 font-medium text-xs ml-1 ">
								Check
								<br />
								Availability
							</button>
						</div>
						<div className="form-control  flex-row ">
							<label htmlFor="pw" className="label w-24 justify-end">
								<span className="label-text pr-3 font-bold">PW</span>
							</label>
							<input type="text" id="pw" placeholder="password" className="input input-bordered w-52" />
						</div>
						<div className="form-control  flex-row ">
							<label htmlFor="confirmPw" className="label w-24">
								<span className="label-text font-bold">Confrim PW</span>
							</label>
							<input type="text" id="confirmPw" placeholder="password" className="input input-bordered w-52" />
						</div>
						<div className="form-control mt-6">
							<label htmlFor="my-modal-6" className="btn btn-primary w-1/3 m-auto">
								Join
							</label>
						</div>
					</div>
				</div>
			</div>
			<Modal content="축하합니다. 가입이 완료되었습니다 :)" />
		</>
	);
};
