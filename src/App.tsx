import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./views/Login";
import { Nav } from "./components/Nav";
import { SignUp } from "./views/SignUp";
import "./index.css";
import { Record } from "./views/Record";
import { EditCloset } from "./views/EditCloset";
import { Post } from "./views/Post";
import React, { lazy, useEffect } from "react";
import { auth, getUserData } from "./firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo, userState } from "./store/user";
import { Talk } from "./views/Talk";
import { postData, userPostState } from "./store/post";

const TodayClothes = lazy(() => import("./views/TodayClothes"));
const Closet = lazy(() => import("./views/Closet"));

function App() {
	const [login, setLogin] = useRecoilState(userState);
	const [, setUser] = useRecoilState(userInfo);
	const [, setUserPosts] = useRecoilState(userPostState)
	const posts = useRecoilValue(postData)

	useEffect(() => {
		const isLogin = localStorage.getItem('isLogin') === 'true';
		if(isLogin) setLogin(isLogin);
		auth.onAuthStateChanged(async (user) => {
		  if (user !== null) {
			const c = await getUserData(user.uid);
			setUser(c || null);
			const userPosts = posts.filter(post => post.uid === user.uid)
			setUserPosts(userPosts)
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
							login ? (
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
						path="/record"
						element={
							<React.Suspense fallback={<div>Loading...</div>}>
								<Record />
							</React.Suspense>
						}
					/>
					<Route path="/talk" element={<Talk />} />
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/editCloset" element={<EditCloset />} />
					<Route path="/post" element={<Post />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
