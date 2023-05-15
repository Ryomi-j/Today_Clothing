import React from "react";
import { RecoilRoot } from "recoil";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RecoilRoot>
			<React.Suspense fallback={<div>Loading...</div>}>
				<App />
			</React.Suspense>
		</RecoilRoot>
	</React.StrictMode>
);
