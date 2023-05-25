import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { SignUp } from "./views/SignUp";
import { Record } from "./views/Record";
import { EditPost } from "./views/EditPost";
import TodayClothes from "./views/TodayClothes";
import Talk from "./views/Talk";
import Closet from "./views/Closet";
import "./index.css";
import React, { lazy, useEffect } from "react";
import { auth, getUserData } from "./firebase";
import { useRecoilState } from "recoil";
import { User, userInfo } from "./store/user";
import { userPost } from "./store/post";

const Login = lazy(() => import("./views/Login"));

function App() {
	const isLogin = JSON.parse(localStorage.getItem("isLogin") || "");
	const [, setUser] = useRecoilState(userInfo);
	const [, setUserPosts] = useRecoilState(userPost);

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user !== null) {
				const c = await getUserData(user.uid);
				if (c !== null) {
					setUser(c as unknown as User);
					setUserPosts(JSON.parse(localStorage.getItem("userPosts") || "[]"));
				}
			}
		});
	}, []);

	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Routes>
					<Route path="/*" element={isLogin ? <TodayClothes /> : <Talk />} />
					<Route
						path="/login"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<Login />
							</React.Suspense>
						}
					/>
					<Route path="/closet" element={<Closet />} />
					<Route path="/talk" element={<Talk />} />
					<Route path="/todayClothes" element={<TodayClothes />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/record" element={<Record />} />
					<Route path="/editPost" element={<EditPost />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
