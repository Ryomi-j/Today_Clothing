import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Login } from "./views/Login";
import { Nav } from "./components/Nav";
import { SignUp } from "./views/SIgnUp";
import "./index.css";
import { TodayClothes } from "./views/TodayClothes";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<main>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/*" element={<TodayClothes />} />
				</Routes>
			</main>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
