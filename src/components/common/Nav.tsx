import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfo } from "../../store/user";
import { logout } from "../../firebase";
import { nextWeekUserPost } from "../../store/post";

export const Nav = () => {
  const [, setUserInfo] = useRecoilState(userInfo);
  const [, setPostArr] = useRecoilState(nextWeekUserPost);
  const isLogin =
    localStorage.getItem("isLogin") === null
      ? false
      : JSON.parse(localStorage.getItem("isLogin") || "");

  const handleLogout = () => {
    if (!isLogin) return;
    logout();
    setUserInfo(null);
    setPostArr([]);
    localStorage.setItem("isLogin", "false");
  };

  return (
    <nav className="navbar absolute bg-base-100 justify-center">
      <div className="flex gap-12 w-full max-w-5xl">
        <div className="navbar-start w-full xl:w-1/2">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 items-center"
            >
              <li className="font-semibold">
                <Link to="/talk">Talk</Link>
              </li>
              {isLogin && (
                <>
                  <li className="font-semibold">
                    <Link to="/TodayClothes">Today's Clothing</Link>
                  </li>
                  <li className="font-semibold">
                    <Link to="/closet">My Closet</Link>
                  </li>
                </>
              )}
              <li className="font-semibold" onClick={handleLogout}>
                {isLogin ? (
                  <Link to="/login">Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            <div className="flex items-center gap-1">
              <figure className="flex justify-center items-center w-7 h-7 rounded-full bg-sky-500">
                <img src="/logo.svg" alt="logo" />
              </figure>
              <h1 className="hidden xs:block">Today Clothing</h1>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 items-center">
            <li className="font-semibold">
              <Link to="/talk">Talk</Link>
            </li>
            {isLogin && (
              <>
                <li className="font-semibold">
                  <Link to="/TodayClothes">Today's Clothing</Link>
                </li>
                <li className="font-semibold">
                  <Link to="/closet">My Closet</Link>
                </li>
              </>
            )}
            <li className="font-semibold" onClick={handleLogout}>
              {isLogin ? (
                <Link to="/login">Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
