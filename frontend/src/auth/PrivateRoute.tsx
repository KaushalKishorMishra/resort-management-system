import React, { useEffect, useState } from "react";
import { isAuthenticated } from "./authIndex";
import { Navigate, Outlet } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivateRoute: React.FC = () => {
	const [isAuthorized, setIsAuthorized] = useState<false | "guest" | "admin" | null>(null);

	useEffect(() => {
		const checkAuthorization = async () => {
			try {
				const val = await isAuthenticated();
				setIsAuthorized(val);
			} catch (err) {
				console.log(err);
				setIsAuthorized(false);
			}
		};

		checkAuthorization();
	}, []);

	if (isAuthorized === null) {
		return (
			<>
				Loading <VscLoading />
			</>
		);
	} else if (isAuthorized === false) {
		console.log("unauthorized");
		return <Navigate to="/unauthorized" />;
	}

	console.log("authorized " + isAuthorized);
	return (
		<>
			<Navbar positionFixed={true} />
			<Outlet />
			<Footer />
		</>
	);
};

export default PrivateRoute;
