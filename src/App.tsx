import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./views/Login";
import { Nav } from "./components/Nav";
import { SignUp } from "./views/SignUp";
import { Record } from "./views/Record";
import { EditPost } from "./views/EditPost";
import "./index.css";
import React, { lazy, useEffect } from "react";
import { auth, getUserData } from "./firebase";
import { useRecoilState } from "recoil";
import { User, userInfo } from "./store/user";
import { userPost } from "./store/post";

const TodayClothes = lazy(() => import("./views/TodayClothes"));
const Closet = lazy(() => import("./views/Closet"));
const Talk = lazy(() => import("./views/Talk"));

function App() {
	const isLogin = JSON.parse(localStorage.getItem('isLogin') || '')
	const [, setUser] = useRecoilState(userInfo);
	const [, setUserPosts] = useRecoilState(userPost)

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user !== null) {
				const c = await getUserData(user.uid);
				if (c !== null) {
					setUser(c as unknown as User);
					setUserPosts(JSON.parse(localStorage.getItem('userPosts') || "[]"))
				}
			} 
		});
	}, []);

	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Routes>
					<Route
						path="/*"
						element={
							isLogin ? (
								<React.Suspense fallback={<div>Loading...</div>}>
									<TodayClothes />
								</React.Suspense>
							) : (
								<Talk />
							)
						}
					/>
					<Route
						path="/todayClothes"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<TodayClothes />
							</React.Suspense>
						}
					/>
					<Route
						path="/closet"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<Closet />
							</React.Suspense>
						}
					/>
					<Route
						path="/talk"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<Talk />
							</React.Suspense>
						}
					/>
					<Route path="/login" element={<Login />} />
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