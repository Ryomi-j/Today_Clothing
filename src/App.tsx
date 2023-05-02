import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./views/Login";
import { Nav } from "./components/Nav";
import { SignUp } from "./views/SignUp";
import "./index.css";
import { TodayClothes } from "./views/TodayClothes";
import { Closet } from "./views/Closet";
import { Record } from "./views/Record";
import { EditCloset } from "./views/EditCloset";
import { Post } from "./views/Post";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useRecoilState } from "recoil";
import { UserData, activeUser, userState } from "./store/user";

function App() {
	const [login, setLogin] = useRecoilState(userState);
	const [userInfo, setUserInfo] = useRecoilState(activeUser);

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user !== null) {
				const userUid = JSON.parse(JSON.stringify(user)).uid;
				setLogin(true);
				setUserInfo(userUid);
				console.log(user);
			} else {
				setLogin(false)
				setUserInfo("")
				console.log('로그인된 정보가 없습니다.')
			}
		});
	}, []);

	console.log(UserData)

	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Routes>
					<Route path="/*" element={<TodayClothes />} />
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/closet" element={<Closet />} />
					<Route path="/record" element={<Record />} />
					<Route path="/editCloset" element={<EditCloset />} />
					<Route path="/post" element={<Post />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
