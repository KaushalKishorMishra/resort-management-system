import React from "react";
import { FaBath, FaBed, FaHome } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { TbRulerMeasure } from "react-icons/tb";
import { useRoomStore } from "../../store/useRoomStore";

const RoomDetails: React.FC = () => {
	const roomId = useRoomStore(state => state.selectedRoom);
	return (
		<>
			<div className="p-4 lg:px-10">
				{/* heading */}
				<h2 className=" text-black text-4xl font-bold">Lotus Pagoda {roomId}</h2>
				{/* room features */}
				<div className="features flex flex-col border m-4 md:mx-16 gap-7 p-3 rounded-xl text-gray-700 border-slate-300">
					<div className="row flex-evenly">
						<div className="feature flex-center flex-col">
							<FaHome className="text-2xl" />
							<p>Type</p>
							<p className="text-black text-lg">{"deluxe"}</p>
							{/* family, deluxe, standard */}
						</div>
						<div className="feature flex-center flex-col">
							<MdGroups className="text-2xl" />
							<p>Capacity</p>
							<p className="text-black text-lg">{"4"}</p>
						</div>
						<div className="feature flex-center flex-col">
							<IoMdTime className="text-2xl" />
							<p>Check In</p>
							<p className="text-black text-lg">10 am</p>
						</div>
					</div>
					<div className="row flex-evenly">
						<div className="feature flex-center flex-col">
							<FaBed className="text-2xl" />
							<p>Bedroom</p>
							<p className="text-black text-lg">{"2"}</p>
						</div>
						<div className="feature flex-center flex-col">
							<FaBath className="text-2xl" />
							<p>Bathroom</p>
							<p className="text-black text-lg">{"2"}</p>
						</div>
						<div className="feature flex-center flex-col">
							<TbRulerMeasure className="text-2xl" />
							<p>Size</p>
							<p className="text-black text-lg">{"100"} sqm</p>
						</div>
					</div>
				</div>

				{/* description */}
				<h3 className="text-2xl font-semibold">Description</h3>
				<p className="line-clamp-2">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, nisi labore recusandae sunt
					corrupti suscipit, non, tempora sint nesciunt magni perspiciatis repellendus rem vitae rerum quod
					adipisci odio hic beatae.
				</p>
			</div>
			{/* book now */}
			<div className="book-now flex justify-around items-center bg-custom-bg-dark rounded-t-xl mt-2 py-2">
				<div className="text-white">
					<p className="font-bold text-xl">RS 6000</p>
					<p>Per Night</p>
				</div>
				<div></div>
				<div className="btn text-lg rounded-none text-white border-white hover:border-custom-accent bg-custom-accent hover:bg-custom-bg-dark hover:text-custom-accent font-ostwald">
					BOOK
				</div>
			</div>
		</>
	);
};

export default RoomDetails;
