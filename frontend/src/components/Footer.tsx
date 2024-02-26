import React from "react";
import { FaArrowRight, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
	return (
		<>
			<div className="bg-custom-bg-dark">
				<footer className="footer p-10 text-white font-ostwald container mx-auto flex flex-col">
					<div className="flex justify-between items-center w-full">
						<div className="flex items-center gap-5">
							<img src="../../public/carnation-flower.png" alt="carnation flowers" className="h-24" />
							<p className="font-bold text-5xl">CALL FOR BOOKING</p>
						</div>
						<div className="flex items-center gap-5">
							<FaPhoneAlt size={30} />
							<p className="font-semibold text-lg">015-123456</p>
							<Link
								to="/"
								className="btn text-lg rounded-none text-white border-white hover:border-custom-accent bg-custom-accent hover:bg-custom-bg-dark hover:text-custom-accent"
							>
								BOOK NOW <FaArrowRight />
							</Link>
						</div>
					</div>
					<div className="line border-b border-white border-opacity-20 w-full"></div>
					<div>hi</div>
					<div className="line border-b border-white border-opacity-20 w-full"></div>
				</footer>
			</div>
		</>
	);
};

export default Footer;
