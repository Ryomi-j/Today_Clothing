import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Nav } from "./components/Nav";
import {  SignUp } from "./components/SIgnIn";
import "./index.css";

function App() {
	return (
		<>
			<Nav />
			<Login />
      <SignUp />
			<Footer />
		</>
	);
}

export default App;
