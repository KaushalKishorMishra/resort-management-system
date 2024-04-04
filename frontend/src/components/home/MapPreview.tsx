import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const MapPreview: React.FC = () => {
	return (
		<>
			<div className="map-preview bg-custom-bg-light py-10">
				<div className="container flex justify-between items-center flex-col md:flex-row gap-8 md:gap-20">
					<div className="room-data w-full md:w-2/5">
						<p className="text-custom-accent uppercase font-bold font-ostwald text-lg">ROOMS</p>
						<h3 className="text-4xl uppercase font-kalam text-black font-extrabold my-5">
							INTERACTIVE MAP - YOUR BOOKING COMPANION
						</h3>
						<p className="text-black my-3">
							Navigate through our offerings effortlessly and secure your dream room with our interactive
							map. Explore our website to learn more about our facilities and book your next stay with us.
						</p>
						<Link to="/rooms" className="btn-square-outline-light">
							GOTO MAP <FaArrowRight className="text-custom-accent" />
						</Link>
					</div>
					<div className="room-preview w-full md:w-3/5">
						<img
							src="../../../public/map/map-preview.png"
							alt="resort map layout"
							className="w-full object-cover"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default MapPreview;
