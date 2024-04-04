import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BasicLayout = (): ReactNode => {
	return (
		<>
			<Navbar positionFixed={false} />
			<Outlet />
			<Footer />
		</>
	);
};

export default BasicLayout;
