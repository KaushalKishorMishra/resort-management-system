import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layouts = (): ReactNode => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default Layouts;
