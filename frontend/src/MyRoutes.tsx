import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layouts from "./pages/Layouts";
import Home from "./pages/Home";

const MyRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Layouts />} >
					<Route index element={<Home />} />
					<Route path="/about" element={<h1>About</h1>} />
					<Route path="/contact" element={<h1>Contact</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRoutes;
