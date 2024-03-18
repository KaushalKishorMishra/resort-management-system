import React from "react";
import Map from "../components/map/Map";
import RoomCarousel from "../components/room/RoomCarousel";
import RoomDetails from "../components/room/RoomDetails";

const Room: React.FC = () => {
	return (
		<>
			<div className="md:container flex flex-col md:flex-row">
				<div className="map-container w-full h-fit md:w-1/2 border border-blue-500 overflow-clip">
					<Map image={"../../public/map/resort-map-photoshop-dull.png"} alt={"resort map"} />
				</div>
				<div className="room-details w-full md:w-1/2 md:mx-4 mb-4 overflow-hidden bg-custom-bg-light text-black">
					<div className="flex flex-col">
						<RoomCarousel />
						<RoomDetails />
					</div>
				</div>
			</div>
		</>
	);
};

export default Room;
