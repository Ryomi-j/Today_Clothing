import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/common/Footer";
import { Nav } from "./components/common/Nav";
import { SignUp } from "./views/SignUp";
import { Record } from "./views/Record";
import { EditPost } from "./views/EditPost";
import Talk from "./views/Talk";
import Closet from "./views/Closet";
import "./index.css";
import React, { lazy, useEffect } from "react";
import { auth, getUserData } from "./firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { User, userInfo } from "./store/user";
import { postData, userPost } from "./store/post";

const Login = lazy(() => import("./views/Login"));
const TodayClothes = lazy(() => import("./views/TodayClothes"));

function App() {
  const isLogin =
    localStorage.getItem("isLogin") === null
      ? false
      : JSON.parse(localStorage.getItem("isLogin") || "");
  const [, setUser] = useRecoilState(userInfo);
  const [, setUserPosts] = useRecoilState(userPost);
  const posts = useRecoilValue(postData);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const c = await getUserData(user.uid);
        if (c) {
          setUser(c as unknown as User);
          const userPosts = posts.filter((post) => post.uid === user.uid);
          setUserPosts(userPosts);
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
          <Route path="/login" element={<Login />} />
          <Route path="/todayClothes" element={<TodayClothes />} />
          <Route path="/closet" element={<Closet />} />
          <Route path="/talk" element={<Talk />} />
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
