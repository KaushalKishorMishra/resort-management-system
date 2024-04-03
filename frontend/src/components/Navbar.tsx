import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { LuUserCircle2 } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

type NavbarProps = {
	positionFixed: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ positionFixed }) => {
	const [currentPage, setCurrentPage] = React.useState<string>("");
	const location = useLocation();

	useEffect(() => {
		const highlightCurrentPage = () => {
			const currentUrl = location.pathname;
			if (currentUrl.includes("rooms")) {
				setCurrentPage("rooms");
			} else if (currentUrl.includes("about")) {
				setCurrentPage("about");
			} else if (currentUrl.includes("activities")) {
				setCurrentPage("activities");
			} else {
				setCurrentPage("explore");
			}
			// window.location.reload();
		};
		highlightCurrentPage();
	}, [location.pathname]);

	return (
		<>
			<div className={`w-full bg-custom-bg-dark z-10 ${positionFixed ? "fixed top-0 left-0" : ""}`}>
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
									className="menu menu-lg dropdown-content mt-3 z-[1] py-2 px-4 shadow rounded-box w-[90vw] max-w-lg bg-custom-bg-dark divide-y"
								>
									<li
										className={`${
											currentPage == "explore" &&
											"underline decoration-custom-accent underline-offset-4"
										}`}
									>
										<Link to="/">EXPLORE</Link>
									</li>
									<li
										className={`${
											currentPage == "rooms" &&
											"underline decoration-custom-accent underline-offset-4"
										}`}
									>
										<Link to="/rooms">ROOMS</Link>
									</li>
									<li
										className={`${
											currentPage == "about" &&
											"underline decoration-custom-accent underline-offset-4"
										}`}
									>
										<Link to="/about">ABOUT</Link>
									</li>
									<li
										className={`${
											currentPage == "activities" &&
											"underline decoration-custom-accent underline-offset-4"
										}`}
									>
										<Link to="/activities">ACTIVITIES</Link>
									</li>
								</ul>
							</div>
							<Link to="/" className="btn btn-ghost text-xl">
								ResortUI
							</Link>
						</div>
						{/* center nav */}
						<div className="navbar-center hidden lg:flex">
							<ul className="menu menu-horizontal px-1 text-lg">
								<li
									className={`${
										currentPage == "explore" &&
										"underline decoration-custom-accent underline-offset-4"
									}`}
								>
									<Link to="/">EXPLORE</Link>
								</li>
								<li
									className={`${
										currentPage == "rooms" &&
										"underline decoration-custom-accent underline-offset-4"
									}`}
								>
									<Link to="/rooms">ROOMS</Link>
								</li>
								<li
									className={`${
										currentPage == "about" &&
										"underline decoration-custom-accent underline-offset-4"
									}`}
								>
									<Link to="/about">ABOUT</Link>
								</li>
								<li
									className={`${
										currentPage == "activities" &&
										"underline decoration-custom-accent underline-offset-4"
									}`}
								>
									<Link to="/activities">ACTIVITIES</Link>
								</li>
							</ul>
						</div>
						<div className="navbar-end">
							<Link to="/profile">
								<LuUserCircle2 className="text-4xl me-5 hover:scale-105" />
							</Link>
							<Link
								to="/rooms"
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
