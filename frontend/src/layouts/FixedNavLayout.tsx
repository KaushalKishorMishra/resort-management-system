import { Outlet } from "react-router-dom";
import { ReactNode } from "react";
import Navbar from "../components/Navbar";

const FixedNavLayout = (): ReactNode => {
	return (
		<>
			<Navbar positionFixed={true} />
			<Outlet />
		</>
	);
};

export default FixedNavLayout;
