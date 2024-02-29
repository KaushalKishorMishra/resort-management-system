import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<>
			<div className="w-full bg-custom-bg-dark">
				<div className="md:container">
					<div className="navbar bg-custom-bg-dark text-white border-b border-custom-bg-light border-opacity-40 font-ostwald">
						<div className="navbar-start">
							<div className="dropdown">
								<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h8m-8 6h16"
										/>
									</svg>
								</div>
								{/* dropdown nav */}
								<ul
									tabIndex={0}
									className="menu menu-lg dropdown-content mt-3 z-[1] py-2 px-4 shadow rounded-box w-[90vw] bg-custom-bg-dark"
								>
									<li className="underline decoration-custom-accent underline-offset-4 border-b border-opacity-5 border-white">
										<Link to="/explore">EXPLORE</Link>
									</li>
									<li className="underline-offset-4 border-b border-opacity-5 border-white">
										<Link to="/">ROOMS</Link>
									</li>
									<li className="underline-offset-4 border-b border-opacity-5 border-white">
										<Link to="/">ABOUT</Link>
									</li>
									<li>
										<Link to="/">ACTIVITIES</Link>
									</li>
								</ul>
							</div>
							<a className="btn btn-ghost text-xl">ResortUI</a>
						</div>
						{/* center nav */}
						<div className="navbar-center hidden lg:flex">
							<ul className="menu menu-horizontal px-1 text-lg">
								<li className="underline decoration-custom-accent underline-offset-4">
									<Link to="/">EXPLORE</Link>
								</li>
								<li>
									<Link to="/rooms">ROOMS</Link>
								</li>
								<li>
									<Link to="/">ABOUT</Link>
								</li>
								<li>
									<Link to="/">ACTIVITIES</Link>
								</li>
							</ul>
						</div>
						<div className="navbar-end">
							<Link
								to="/"
								className="btn text-lg rounded-none text-white border-white bg-transparent hover:bg-white hover:text-custom-bg-dark"
							>
								BOOK NOW <FaArrowRight className="text-custom-accent" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
