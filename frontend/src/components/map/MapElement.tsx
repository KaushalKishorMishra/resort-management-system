import React, { useEffect } from "react";
// import { FaMapMarkerAlt } from "react-icons/fa";
import { GiPlainCircle } from "react-icons/gi";
import { useRoomStore } from "../../store/useRoomStore";
import { FaDiamond } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { BookingApi } from "../../apis/bookingApi";

type MapElementProps = {
	top: string;
	left: string;
	id: number;
	// status: "booked" | "available" | "cleaning" | "maintenance";
	type: "deluxe" | "family" | "standard";
};

const MapElement: React.FC<MapElementProps> = ({ top, left, id, type }) => {
	const [status, setStatus] = React.useState("available");
	const selectedId = useRoomStore(state => state.selectedRoom);
	const setSelectedRoom = useRoomStore(state => state.setSelectedRoom);

	useEffect(() => {
		const checkAvailability = async () => {
			const startDate = sessionStorage.getItem("startDate");
			const endDate = sessionStorage.getItem("endDate");
			console.log(startDate, endDate);
			const res = await BookingApi.rangeSearch({
				start_date: startDate || "2024-04-05",
				end_date: endDate || "2024-04-06",
			});
			const array = res.data.data;
			for (const x in array) {
				if (array[x].roomId == id) {
					setStatus("booked");
					console.log(id, "is booked");
					return;
				}
				setStatus("available");
			}
		};
		// setInterval(() => {
		checkAvailability();
		// }, 5000);
	}, []);
	// text-red-600 for booked
	// text-[#bbcb31]
	return (
		<>
			<ToastContainer />
			<span
				className={`${
					id == selectedId && "animate-ping absolute inline-flex h-5 w-5 bg-green-300 rounded-full opacity-75"
				}`}
				style={{ top: `${top}`, left: `${left}`, translate: "-50% -50%" }}
			></span>
			<div
				className={`absolute h-6 w-6 cursor-pointer flex-center text-xl lg:text-2xl
					${status == "available" ? "text-green-400" : ""} 
					${status == "cleaning" && "text-green-400"} 
					${status == "booked" ? "text-red-600" : "text-green-400"}`}
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
						setSelectedRoom(id);
						toast.info("Room is already booked", {
							position: "top-right",
							theme: "dark",
							autoClose: 1500,
						});
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
