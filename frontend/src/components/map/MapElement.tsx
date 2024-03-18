import React from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";
import { GiPlainCircle } from "react-icons/gi";

type MapElementProps = {
	top: string;
	left: string;
	id: string;
	color: string;
};

const MapElement: React.FC<MapElementProps> = ({ top, left, id, color }) => {
	return (
		// text-red-600 for booked
		// text-[#bbcb31]
		<GiPlainCircle
			className="absolute h-3 w-3 text-red-600 drop-shadow-lg drop cursor-pointer"
			style={{ top: `${top}`, left: `${left}`, translate: "-50% -50%", color: `${color}` }}
			onClick={() => alert(`${id} click bhayo hai`)}
		/>
	);
};

export default MapElement;
