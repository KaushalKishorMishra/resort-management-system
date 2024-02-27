import React from "react";

const MapPreview: React.FC = () => {
	return (
		<>
			<div className="map-preview bg-custom-bg-light py-10">
				<div className="container flex justify-between items-center flex-col md:flex-row gap-8 md:gap-20">
					<div className="room-data w-full md:w-2/5">
						<p className="text-custom-accent uppercase font-bold font-ostwald">ROOMS</p>
						<h3 className="text-4xl uppercase font-kalam text-black font-extrabold my-5">
							INTERACTIVE MAP - YOUR BOOKING COMPANION
						</h3>
						<p className="text-black">
							Navigate through our offerings effortlessly and secure your dream room with our interactive
							map
						</p>
					</div>
					<div className="room-preview w-full md:w-3/5">
						<img src="../../../public/2-chairs-in-resort.jpg" alt="resort map layout" className="h-full object-cover" />
					</div>
				</div>
			</div>
		</>
	);
};

export default MapPreview;
