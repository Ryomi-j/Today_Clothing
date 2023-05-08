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
import { auth, getUserData } from "./firebase";
import { useRecoilState } from "recoil";
import { userInfo, userState } from "./store/user";
import { geolocation } from "./store/geolocation";

function App() {
	const [login, setLogin] = useRecoilState(userState);
	const [user, setUser] = useRecoilState(userInfo);
	const [location, setLocation] = useRecoilState(geolocation);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user !== null) {
				const c = await getUserData(user.uid);
				setUser(c || {});
				setLogin(true);
			} else {
				setLogin(false);
			}
		});
	}, []);

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
