import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./views/Login";
import { Nav } from "./components/Nav";
import { SignUp } from "./views/SIgnUp";
import "./index.css";
import { TodayClothes } from "./views/TodayClothes";
import { Closet } from "./views/Closet";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/*" element={<TodayClothes />} />
					<Route path="/my_closet" element={<Closet />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
