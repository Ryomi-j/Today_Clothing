export const SignUp = () => {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="card flex-shrink-0 w-3/5 h-4/5 shadow-2xl bg-base-100">
				<div className="card-body p-20 gap-5">
					<h2 className="text-center text-5xl font-bold">Sign Up</h2>
					<div className="form-control flex-row  mt-16">
						<label htmlFor="id" className="label w-24 justify-end">
							<span className="label-text pr-3 font-bold">ID</span>
						</label>
						<input type="text" id="id" placeholder="id" className="input input-bordered" />
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
						<input type="text" id="pw" placeholder="password" className="input input-bordered" />
					</div>
					<div className="form-control  flex-row ">
						<label htmlFor="confirmPw" className="label w-24">
							<span className="label-text font-bold">Confrim PW</span>
						</label>
						<input type="text" id="confirmPw" placeholder="password" className="input input-bordered" />
					</div>
					<div className="form-control mt-6 items-center">
						<button className="btn btn-primary w-1/3 ">Join</button>
					</div>
				</div>
			</div>
		</div>
	);
};
