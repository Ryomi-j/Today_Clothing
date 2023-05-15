import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { UserWithProfile, getUserData, loginGoogle, signIn } from "../firebase";
import { useRecoilCallback, useRecoilState } from "recoil";
import { userInfo, userState } from "../store/user";
import { GetGeoInfo } from "../utils/userGeolocation";

export const Login = () => {
	const idInput = useRef<HTMLInputElement>(null);
	const pwInput = useRef<HTMLInputElement>(null);
	const [, setLogin] = useRecoilState(userState);
	const navigate = useNavigate();

	const setUser = useRecoilCallback(({ set }) => (newUser: UserWithProfile | null) => {
		set(userInfo, newUser);
	  });

	const handleLogin = () => {
		const id = idInput?.current?.value + "@todayClothing.com" ?? "";
		const pw = pwInput?.current?.value ?? "";
		signIn(id, pw).then(async (success: any) => {
			if (success) {
				const c = await getUserData(success);
				setUser(c);
				setLogin(true);
				navigate(`/closet/${success.uid}`);
				localStorage.setItem("isLogin", "true");
			}
		});
	};

	const googleLogin = () => {
		loginGoogle()
			.then(async (user) => {
				if (user) {
					const c = await getUserData(user);
					setUser(c);
					setLogin(true);
					navigate(`/closet/${user.uid}`);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<GetGeoInfo />
			<div className="hero min-h-[calc(100vh-3.3rem)] pt-16 bg-base-200">
				<div className="card flex-shrink-0 shadow-2xl bg-base-100">
					<div className="card-body p-14 gap-5">
						<h2 className="text-center text-5xl font-bold">Login</h2>
						<div className="form-control flex-row justify-center mt-16 ">
							<label className="label w-24  pr-5">
								<span className="label-text font-bold">ID</span>
							</label>
							<input type="text" placeholder="id" className="input input-bordered" ref={idInput} />
						</div>
						<div className="form-control  flex-row justify-center">
							<label className="label w-24 pr-3 ">
								<span className="label-text font-bold">PW</span>
							</label>
							<input type="password" placeholder="password" className="input input-bordered" ref={pwInput} />
						</div>
						<div className="flex mt-6 items-center">
							<label className="btn btn-primary w-1/3 m-auto" id="login" onClick={handleLogin}>
								Login
							</label>
						</div>
						<label className="label justify-end mt-3">
							<Link to="/sign-up" className="label-text-alt link link-hover mt-2 text-base">
								Create Account
							</Link>
						</label>
						<div className="divider"></div>
						<div className="flex flex-col gap-7">
							<p className="text-center mt-4">Social login can save your valuable time.</p>
							<button className="btn w-1/3 m-auto" onClick={googleLogin}>
								Google
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
