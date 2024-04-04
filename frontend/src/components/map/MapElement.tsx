import React from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";
import { GiPlainCircle } from "react-icons/gi";
import { useRoomStore } from "../../store/useRoomStore";
import { FaDiamond } from "react-icons/fa6";

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
				className={`absolute h-6 w-6 cursor-pointer flex-center text-xl lg:text-2xl text-opacity-75
					${status == "available" && "text-green-400"} 
					${status == "cleaning" && "text-green-400"} 
					${status == "booked" && "text-red-600"}`}
				style={{
					top: `${top}`,
					left: `${left}`,
					translate: "-50% -50%",
					color: `${id == selectedId ? "#55e" : ""}`,
					cursor: `${status == "maintenance" && "not-allowed"}`,
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
				{type == "deluxe" && <FaDiamond />}
				{type == "family" && <GiPlainCircle />}
				{type == "standard" && <GiPlainCircle />}
				<span
					className={`text-black text-sm absolute font-semibold`}
					style={{ top: `50%`, left: `50%`, translate: "-50% -50%" }}
				>
					{id}
				</span>
			</div>
		</>
	);
};

export default MapElement;
