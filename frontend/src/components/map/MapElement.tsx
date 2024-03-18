import React from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";
import { GiPlainCircle } from "react-icons/gi";
import { useRoomStore } from "../../store/useRoomStore";
import { RiDoorFill } from "react-icons/ri";
import { BsFillSuitDiamondFill } from "react-icons/bs";

type MapElementProps = {
	top: string;
	left: string;
	id: number;
	status: "booked" | "available" | "cleaning" | "maintenance";
	type: "deluxe" | "family" | "standard";
};

const MapElement: React.FC<MapElementProps> = ({ top, left, id, status, type }) => {
	const selectedId = useRoomStore(state => state.selectedRoom);
	const setSelectedRoom = useRoomStore(state => state.setSelectedRoom);
	// text-red-600 for booked
	// text-[#bbcb31]
	return (
		<>
			<span
				className={`${
					id == selectedId && "animate-ping absolute inline-flex h-5 w-5 bg-green-300 rounded-full opacity-75"
				}`}
				style={{ top: `${top}`, left: `${left}`, translate: "-50% -50%" }}
			></span>
			<div
				className={`absolute h-6 w-6 cursor-pointer flex-center text-lg
					${status == "available" && "text-green-300"} 
					${status == "cleaning" && "text-green-300"} 
					${status == "maintenance" && "text-slate-500 cursor-not-allowed"} 
					${status == "booked" && "text-red-600"}`}
				style={{
					top: `${top}`,
					left: `${left}`,
					translate: "-50% -50%",
					color: `${id == selectedId ? "#55e" : ""}`,
				}}
				onClick={() => {
					if (status == "available" || status == "cleaning") {
						setSelectedRoom(id);
					} else if (status == "booked") {
						alert("Room is already booked");
					} else if (status == "maintenance") {
						alert("Room is under maintenance");
					}
				}}
			>
				{type == "deluxe" && <BsFillSuitDiamondFill />}
				{type == "family" && <GiPlainCircle />}
				{type == "standard" && <RiDoorFill />}
			</div>
		</>
	);
};

export default MapElement;
