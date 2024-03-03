import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Book from "./pages/Book";
import SignUp from "./pages/SignUp";
import FixedNavLayout from "./layouts/FixedNavLayout";
import BasicLayout from "./layouts/BasicLayout";
import Login from "./pages/Login";

const MyRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<BasicLayout />}>
					<Route index element={<Home />} />
					<Route path="/rooms" element={<Room />} />
					<Route path="/about" element={<h1>About</h1>} />
					<Route path="/contact" element={<h1>Contact</h1>} />
					<Route path="/book" element={<Book />} />
				</Route>
				<Route path="" element={<FixedNavLayout />}>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default MyRoutes;
