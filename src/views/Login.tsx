import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { getUserData, loginGoogle, signIn } from "../firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { User, userInfo } from "../store/user";
import { GetGeoInfo } from "../utils/userGeolocation";
import { postData, userPost } from "../store/post";

const Login = () => {
	const idInput = useRef<HTMLInputElement>(null);
	const pwInput = useRef<HTMLInputElement>(null);
	const [, setUser] = useRecoilState(userInfo);
	const [, setUserPosts] = useRecoilState(userPost);
	const posts = useRecoilValue(postData);
	const navigate = useNavigate();

	const handleLogin = () => {
		const id = idInput?.current?.value + "@todayClothing.com" ?? "";
		const pw = pwInput?.current?.value ?? "";
		signIn(id, pw).then(async (user: any) => {
			if (user) {
				const c = await getUserData(user.uid);
				setUser(c as unknown as User);
				setUserPosts(() => posts.filter((post) => post.uid === user.uid));
				navigate(`/todayClothes`);
				localStorage.setItem("isLogin", "true");
			}
		});
	};

	const googleLogin = () => {
		loginGoogle()
			.then(async (uid) => {
				const c = await getUserData(uid || "");
				setUser(c as unknown as User);
				setUserPosts(() => posts.filter((post) => post.uid === uid));
				navigate(`/todayClothes/${uid}`);
				localStorage.setItem("isLogin", "true");
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
					<div className="card-body px-3 md:p-14 md:gap-5">
						<h2 className="text-center text-xl xs:text-4xl md:text-5xl font-bold">Login</h2>
						<div className="form-control flex-row justify-center items-center mt-4 xs:mt-8 md:mt-16 ">
							<label className="label md:w-24  pr-5">
								<span className="label-text font-bold h-fit">ID</span>
							</label>
							<input type="text" placeholder="id" className="input input-bordered w-36 h-8 xs:w-52 xs:h-12 md:auto" ref={idInput} />
						</div>
						<div className="form-control flex-row justify-center md:w-auto">
							<label className="label md:w-24 pr-3 ">
								<span className="label-text font-bold">PW</span>
							</label>
							<input type="password" placeholder="password" className="input input-bordered w-36 h-8 xs:w-52 xs:h-12 md:auto" ref={pwInput} />
						</div>
						<div className="flex mt-6 items-center">
							<label className="btn btn-primary w-1/3 m-auto btn-sm text-xs xs:btn-md" id="login" onClick={handleLogin}>
								Login
							</label>
						</div>
						<label className="label justify-end mt-3">
							<Link to="/sign-up" className="label-text-alt link link-hover md:mt-2 text-base">
								Create Account
							</Link>
						</label>
						<div className="divider"></div>
						<div className="flex flex-col gap-7">
							<p className="text-center mt-4">Social login can save your valuable time.</p>
							<button className="btn w-1/3 m-auto btn-sm text-xs xs:btn-md" onClick={googleLogin}>
								Google
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login