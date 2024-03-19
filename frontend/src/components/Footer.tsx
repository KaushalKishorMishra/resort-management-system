import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<>
			<div className="bg-custom-bg-dark">
				<footer className="footer p-8 text-white font-ostwald md:container flex flex-col">
					<div className="flex flex-col md:flex-row justify-between items-center w-full">
						<div className="flex items-center gap-5">
							<img src="../../public/carnation-flower.png" alt="carnation flowers" className="h-24" />
							<p className="font-bold text-5xl">CALL FOR BOOKING</p>
						</div>
						<div className="flex items-center gap-5 my-5">
							<FaPhoneAlt size={20} />
							<p className="font-semibold text-lg">015-123456</p>
							<Link
								to="/rooms"
								className="btn text-lg rounded-none text-white border-white hover:border-custom-accent bg-custom-accent hover:bg-custom-bg-dark hover:text-custom-accent"
							>
								BOOK NOW <FaArrowRight />
							</Link>
						</div>
					</div>
					<div className="line border-b border-white border-opacity-20 w-full"></div>
					<div className="w-full flex flex-col md:flex-row justify-evenly items-center font-ostwald">
						<span className="flex w-full justify-evenly">
							<Link to="/" className="btn btn-ghost text-xl">
								EXPLORE
							</Link>
							<Link to="/rooms" className="btn btn-ghost text-xl">
								ROOMS
							</Link>
						</span>
						<p className="text-4xl">ResortUI</p>
						<span className="flex w-full justify-evenly">
							<Link to="/about" className="btn btn-ghost text-xl">
								ABOUT
							</Link>
							<Link to="/activities" className="btn btn-ghost text-xl">
								ACTIVITIES
							</Link>
						</span>
					</div>
					<div className="line border-b border-white border-opacity-20 w-full relative">
						<p
							className="absolute text-white top-0 left-[50%] font-sans bg-custom-bg-dark text-xs md:text-sm text-center min-w-max"
							style={{
								transform: "translate(-50%, -50%)",
							}}
						>
							&copy; 2024 <span className="font-semibold">Aaryash Shakya</span> | All Rights Reserved
						</p>
					</div>
				</footer>
			</div>
		</>
	);
};

export default Footer;
