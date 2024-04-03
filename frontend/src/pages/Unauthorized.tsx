import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Unauthorized: React.FC = () => {
	return (
		<>
			<Navbar positionFixed={false} />
			<div className="container flex flex-col items-center justify-center h-screen">
				<h1 className="text-9xl font-bold text-custom-accent">401</h1>
				<p className="text-2xl font-bold">Unauthorized</p>
				<p className="text-lg mt-4">
					You don't have the permission to view the page. Please login to view the page.
				</p>
				<p className="text-lg">Login or navigate back to the homepage.</p>
				<div className="w-full flex justify-evenly">
					<Link
						to="/"
						className="btn text-lg rounded-none text-white border-white hover:border-custom-accent bg-custom-accent hover:bg-custom-bg-dark hover:text-custom-accent mt-10 md:scale-150"
					>
						<FaArrowLeft /> GO BACK
					</Link>
					<Link
						to="/login"
						className="btn text-lg rounded-none hover:text-white hover:border-white border-custom-accent hover:bg-custom-accent bg-custom-bg-dark text-custom-accent mt-10 md:scale-150"
					>
						LOGIN <FaArrowRight />
					</Link>
				</div>
			</div>
		</>
	);
};

export default Unauthorized;
