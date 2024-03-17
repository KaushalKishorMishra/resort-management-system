import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Book from "./pages/Book";
import Signup from "./pages/Signup";
import FixedNavLayout from "./layouts/FixedNavLayout";
import BasicLayout from "./layouts/BasicLayout";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

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
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default MyRoutes;
