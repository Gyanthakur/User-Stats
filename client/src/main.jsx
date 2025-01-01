import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import AppContextProvider from "./context/AppContext.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</BrowserRouter>
);
