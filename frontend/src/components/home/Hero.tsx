import React from "react";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { TbPlant2 } from "react-icons/tb";

const Hero: React.FC = () => {
	return (
		<>
			<div className="bg-custom-bg-dark">
				<div className="md:container pt-4 md:pt-10">
					<div className="hero-img w-full relative md:px-10">
						{/* src: https://unsplash.com/photos/brown-wooden-table-and-chairs-JTUmzXLoqHQ */}
						<img className="image-full" src="../../../public/2-chairs-in-resort.jpg" alt="Resort image" />
						<div className="absolute w-full text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-evenly flex-col">
							<h1 className="text-white font-bold drop-shadow-lg w-full text-6xl md:text-6xl lg:text-8xl break-words">
								STAY WITH COMFORT
							</h1>
							{/* <div className="mt-4 md:mt-10 text-white bg-[#E87030] hover:bg-[#e87030]/90 focus:outline-none focus:ring-4 focus:ring-[#e87030]/30 font-semibold rounded-md border border-bg-custom-dark text-lg px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">
								Get Started
							</div> */}
						</div>
					</div>

					{/* cards carousel */}
					<div
						className="visible md:hidden carousel carousel-center space-x-5 text-[#18130f] w-full p-5"
						data-carousel="static"
					>
						<div className="carousel-item">
							<div className="bg-[#9fd76a] aspect-square p-6 h-64 w-64 flex flex-col justify-center text-2xl font-bold font-kalam">
								<span>DESTINATION.</span>
								<span>LUXURY.</span>
								<span>RESPITE.</span>
							</div>
						</div>
						<div className="carousel-item">
							<div className="bg-[#f1cac5] aspect-square p-6 h-64 w-64 flex flex-col justify-evenly">
								<FaRegHeart size={35} />
								<p className="font-bold text-xl font-kalam">IT'S YOUR OWN. PLAN BIG SHOW</p>
								<p>We love to orchestrating your events</p>
							</div>
						</div>
						<div className="carousel-item">
							<div className="bg-[#eed6b2] aspect-square p-6 h-64 w-64 flex flex-col justify-evenly">
								<TbPlant2 size={35} />
								<p className="font-bold text-xl font-kalam">TRY OUR EXHILARATING SPA & GYM</p>
								<p>Experience world greatest relaxation on earth!</p>
							</div>
						</div>
						<div className="carousel-item">
							<div className="bg-[#fec93d] aspect-square p-6 h-64 w-64 flex flex-col justify-evenly">
								<FaMapMarkerAlt size={35} />
								<p className="font-bold text-xl font-kalam">INTUITIVE & INTERACTIVE MAP</p>
								<p>Explore and book your perfect room</p>
							</div>
						</div>
					</div>

					{/* cards row */}
					<div className="hidden md:grid mx-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-14 px-10 gap-8 text-[#18130f]">
						<div className="bg-[#9fd76a] aspect-square p-6 flex flex-col justify-center text-2xl font-bold font-kalam">
							<span>DESTINATION.</span>
							<span>LUXURY.</span>
							<span>RESPITE.</span>
						</div>
						<div className="bg-[#f1cac5] aspect-square p-6 flex flex-col justify-evenly">
							<FaRegHeart size={30} />
							<p className="font-bold text-xl font-kalam">IT'S YOUR OWN. PLAN BIG SHOW</p>
							<p>We love to orchestrating your events</p>
						</div>
						<div className="bg-[#eed6b2] aspect-square p-6 flex flex-col justify-evenly">
							<TbPlant2 size={30} />
							<p className="font-bold text-xl font-kalam">TRY OUR EXHILARATING SPA & GYM</p>
							<p>Experience world greatest relaxation on earth!</p>
						</div>
						<div className="bg-[#fec93d] aspect-square p-6 flex flex-col justify-evenly">
							<FaMapMarkerAlt size={30} />
							<p className="font-bold text-xl font-kalam">INTUITIVE & INTERACTIVE MAP</p>
							<p>Explore and book your perfect room</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Hero;
