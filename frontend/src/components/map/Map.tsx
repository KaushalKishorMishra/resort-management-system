import React, { useEffect, useState } from "react";
import { GoInfo, GoScreenFull, GoZoomIn, GoZoomOut } from "react-icons/go";
import { PanViewer } from "react-image-pan-zoom-rotate";
import MapElement from "./MapElement";
import { FaCircle } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { HiMiniXMark } from "react-icons/hi2";
import { RoomApi } from "../../apis/roomApi";

type MapProps = {
	image: string;
	alt?: string;
	ref?: string;
};

const Map = ({ image, alt, ref }: MapProps) => {
	const [dx, setDx] = React.useState(0);
	const [dy, setDy] = React.useState(0);
	const [zoom, setZoom] = React.useState(1);
	const [showLegend, setShowLegend] = useState(false);

	const resetAll = () => {
		setDx(0);
		setDy(0);
		setZoom(1);
	};

	const zoomIn = () => {
		if (zoom < 2) setZoom(zoom + 0.2);
	};

	const zoomOut = () => {
		if (zoom >= 1) {
			setZoom(zoom - 0.2);
		}
	};

	const onPan = (dx: number, dy: number) => {
		// console.log("dx", dx, "dy", dy);

		// don't use setDx(100) as when zooming the dx will be multiplied by zoom
		setDx(dx);
		setDy(dy);
	};

	const [roomData, setRoomData] = useState<RoomType[]>([]);
	const getRooms = async () => {
		const response = await RoomApi.getAllRooms();
		const roomData: RoomType[] = response.data.data;
		setRoomData(roomData);

		return roomData.map(room => (
			<MapElement top={room.top} left={room.left} id={room.id} type={room.type} />
		))
	};

	// note: stopPropagation() didn't perform as expected

	// note: using this combinatin of useEffect and addEventListener to prevent scrolling on touch devices when u touch the map
	/*
	By setting overflow: hidden on start of touch it makes everything exceeding window hidden 
	thus removing availability to scroll anything (no content to scroll).

	After touchend the lock can be freed by setting overflow to auto.
	*/
	//! fix: also handle pinch in and pinch out propagation
	useEffect(() => {
		document.getElementById("map-container")?.addEventListener("touchstart", () => {
			document.documentElement.style.overflow = "hidden";
		});
		document?.addEventListener("touchstart", () => {
			document.documentElement.style.overflow = "auto";
		});
		getRooms();
	}, []);

	return (
		<div className="relative bg-slate-400 w-full overflow-clip" id="map-container">
			{/* map navigation button */}
			<div className="absolute right-2 z-10 top-2 rounded bg-white shadow divide-y divide-slate-300">
				<div onClick={zoomIn} className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100">
					<GoZoomIn className="map-nav-button" />
				</div>
				<div className="text-center cursor-pointer h-10 w-10 py-2 hover:bg-slate-100 text-[#4C68C1]">
					x{zoom.toFixed(1)}
				</div>
				<div onClick={zoomOut} className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100">
					<GoZoomOut className="map-nav-button" />
				</div>
				<div onClick={resetAll} className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100">
					<GoScreenFull className="map-nav-button" />
				</div>
			</div>
			<div className="absolute right-2 z-10 bottom-2 rounded bg-white shadow divide-y divide-slate-300">
				<div
					onClick={() => setShowLegend(!showLegend)}
					className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100"
				>
					<GoInfo className="map-nav-button" />
				</div>
			</div>

			{/* map */}
			<PanViewer
				// ! WTF: adding flex in classname gives error
				className="w-full justify-center items-center"
				zoom={zoom}
				setZoom={setZoom}
				pandx={dx}
				pandy={dy}
				onPan={onPan}
				key={dx}
			>
				<img className="w-full relative" src={image} alt={alt} ref={ref} />

				{/* map elements */}
				{roomData.map(room => (
					<MapElement top={room.top} left={room.left} id={room.id} type={room.type} key={room.id}/>
				))}
			</PanViewer>

			{/* legend */}
			{showLegend && (
				<>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 flex-center flex-col gap-3 p-6 w-80 text-black text-xl border border-black rounded-xl">
						<div className="w-full flex justify-start items-center relative">
							<FaHouse className="text-3xl me-3 text-[#c3b919]" />
							Deluxe Room
							<div
								className="absolute top-0 right-0 h-10 w-10 flex-center text-black hover:text-black/70 cursor-pointer"
								onClick={() => setShowLegend(false)}
							>
								<HiMiniXMark size={40} />
							</div>
						</div>
						<div className="w-full flex justify-start items-center">
							<FaHouse className="text-3xl me-3 text-[#896b4d]" />
							Family Room
						</div>
						<div className="w-full flex justify-start items-center">
							<FaHouse className="text-3xl me-3 text-[#bf8f47]" />
							Standard Room
						</div>
						<div className="w-full flex justify-start items-center">
							<FaCircle className="text-3xl me-3 text-green-400" />
							Available
						</div>
						<div className="w-full flex justify-start items-center">
							<FaCircle className="text-3xl me-3 text-red-600" />
							Booked
						</div>
						<div className="w-full flex justify-start items-center">
							<FaCircle className="text-3xl me-3 text-[#55e]" />
							Selected
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Map;
