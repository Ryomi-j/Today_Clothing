import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../store/user";
import { logout } from "../firebase";

export const Nav = () => {
	const [login, setLogin] = useRecoilState(userState);

	const handleLogout = () => {
		if (!login) return;
		logout();
		setLogin(false);
		localStorage.setItem('isLogin', 'false')
		window.location.reload();
	};

	return (
		<div className="navbar absolute bg-base-100 justify-between">
			<div className="navbar-start xxxs:w-full xl:w-1/2">
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
						{login && (
							<>
								<li className="font-medium">
									<Link to="/TodayClothes">Today's Clothing</Link>
								</li>
								<li className="font-medium">
									<Link to="/closet">My Closet</Link>
								</li>
							</>
						)}
						<li className="font-medium" onClick={handleLogout}>
							{login ? <Link to="/login">Login</Link> : <Link to="/login">Login</Link>}
						</li>
					</ul>
				</div>
				<Link to="/" className="btn btn-ghost normal-case text-xl">
					<div className="flex items-center gap-1">
						<figure className="flex justify-center items-center w-7 h-7 rounded-full bg-sky-500">
							<img src="/logo.svg" alt="logo" />
						</figure>
						<h1 className="xxxs:hidden xs:block">Today Clothing</h1>
					</div>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1 items-center">
					<li className="font-medium">
						<Link to="/talk">Talk</Link>
					</li>
					{login && (
						<>
							<li className="font-medium">
								<Link to="/TodayClothes">Today's Clothing</Link>
							</li>
							<li className="font-medium">
								<Link to="/closet">My Closet</Link>
							</li>
						</>
					)}
					<li className="font-medium" onClick={handleLogout}>
						{login ? <Link to="/login">Logout</Link> : <Link to="/login">Login</Link>}
					</li>
				</ul>
			</div>
		</div>
	);
};
