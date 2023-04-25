export const Login = () => {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<div className="card-body">
					<h2 className="text-center text-2xl font-bold">Login</h2>
					<div className="form-control flex-row justify-between mt-6">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input type="text" placeholder="id" className="input input-bordered" />
					</div>
					<div className="form-control  flex-row justify-between">
						<label className="label">
							<span className="label-text">PW</span>
						</label>
						<input type="text" placeholder="password" className="input input-bordered" />
					</div>
					<div className="form-control mt-6">
						<button className="btn btn-primary ">Login</button>
					</div>
					<label className="label justify-end">
						<a href="#" className="label-text-alt link link-hover mt-2 text-base">
							Create Account
						</a>
					</label>
					<div className="divider"></div>
					<p className="text-center">Social login can save your valuable time.</p>
					<button className="btn mt-3">Google</button>
				</div>
			</div>
		</div>
	);
};
