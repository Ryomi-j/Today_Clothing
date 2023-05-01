import { Link } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import { activeUser, userState } from "../store/user";
// import { logout, auth, getLoginState } from "../firebase";
// import { getAuth, signOut } from "firebase/auth";

export const Nav = () => {
	// const [login, setLogin] = useRecoilState(userState);
	// const [userInfo, setUserInfo] = useRecoilState(activeUser);

	// const handleLogout = () => {
	// 	if (!login) return;
	// 	const a = getAuth();
	// 	getLoginState((param: any) =>{
	// 		console.log(1, param);
	// 		signOut(a);
	// 	}).then(() => {
	// 		getLoginState((param: any) => {
	// 			console.log(2, param);
	// 		})
	// 	})
	// const a = getAuth();
	// a.signOut()
	// setLogin(false);
	// setUserInfo({});
	// setLoginState(setLogin)
	// };

	return (
		<div className="navbar absolute bg-base-100 justify-between">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 items-center"
					>
						<li className="font-medium">
							<Link to="/talk">Talk</Link>
						</li>
						<li className="font-medium">
							<Link to="/closet">My Closet</Link>
						</li>
						{/* <li className="font-medium" onClick={handleLogout}>
							{login ? <Link to="/login">Login</Link> : <Link to="/login">Login</Link>}
						</li> */}
					</ul>
				</div>
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					<h1 className="flex items-center gap-1">
						<figure className="flex justify-center items-center w-7 h-7 rounded-full bg-sky-500">
							<img src="/logo.svg" alt="logo" />
						</figure>
						Today Clothing
					</h1>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 items-center">
					<li className="font-medium">
						<Link to="/talk">Talk</Link>
					</li>
					<li className="font-medium">
						<Link to="/closet">My Closet</Link>
					</li>
					<li className="font-medium" /*  onClick={handleLogout} */>
						{/* {login ? <Link to="/login">Logout</Link> : <Link to="/login">Login</Link>} */}
					</li>
				</ul>
			</div>
		</div>
	);
};
