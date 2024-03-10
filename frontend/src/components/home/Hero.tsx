import React from "react";
import { FaMapMarkerAlt, FaRegHeart } from "react-icons/fa";
import { TbPlant2 } from "react-icons/tb";

const Hero: React.FC = () => {
	return (
		<>
			<div className="bg-custom-bg-dark">
				<div className="md:container pt-10 md:pt-20">
					<div className="hero-img w-full relative md:px-10">
						{/* src: https://unsplash.com/photos/brown-wooden-table-and-chairs-JTUmzXLoqHQ */}
						<img className="image-full" src="../../../public/2-chairs-in-resort.jpg" alt="Resort image" />
						<div
							className="text-box absolute w-full text-center"
							style={{
								top: "0",
								left: "0",
								transform: "translate(0, -55%)",
							}}
						>
							<h1 className="text-white font-bold drop-shadow-lg min-w-max text-3xl sm:text-6xl md:text-7xl lg:text-8xl">STAY WITH COMFORT</h1>
							{/* todo make the header always take 100% width */}
							{/* <h1 className="" style={{
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
								width: "100%",
								fontSize: "100%",
								margin: "0",
							}}>STAY WITH COMFORT</h1> */}
						</div>
					</div>


					{/* cards row */}
					<div className="mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-14 px-10 gap-8 text-[#18130f]">
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
