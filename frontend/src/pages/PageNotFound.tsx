import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound: React.FC = () => {
	return (
		<>
			<Navbar positionFixed={false} />
			<div className=" flex flex-col items-center justify-center h-screen">
				<h1 className="text-9xl font-bold text-custom-accent">404</h1>
				<p className="text-2xl font-bold">Page Not Found</p>
				<p className="text-lg mt-4">The page you are looking for does not exist.</p>
				<p className="text-lg">Please check the URL or navigate back to the homepage.</p>
				<Link
					to="/"
					className="btn text-lg rounded-none text-white border-white hover:border-custom-accent bg-custom-accent hover:bg-custom-bg-dark hover:text-custom-accent mt-10 scale-150"
				>
					GO BACK <FaArrowLeft />
				</Link>
			</div>
		</>
	);
};

export default PageNotFound;
