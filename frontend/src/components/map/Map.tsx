import React from "react";
import { GoHome, GoScreenFull, GoZoomIn, GoZoomOut } from "react-icons/go";
import { PanViewer } from "react-image-pan-zoom-rotate";

type MapProps = {
	image: string;
	alt?: string;
	ref?: string;
};

const Map = ({ image, alt, ref }: MapProps) => {
	const [dx, setDx] = React.useState(0);
	const [dy, setDy] = React.useState(0);
	const [zoom, setZoom] = React.useState(1);

	const resetAll = () => {
		setDx(0);
		setDy(0);
		setZoom(1);
	};

	const zoomIn = () => {
		setZoom(zoom + 0.2);
	};

	const zoomOut = () => {
		if (zoom >= 1) {
			setZoom(zoom - 0.2);
		}
	};

	const onPan = (dx: number, dy: number) => {
		setDx(dx);
		setDy(dy);
	};

	return (
		<div className="relative bg-slate-400 w-full">
			{/* map navigation button */}
			<div className="absolute right-2 z-10 top-2 rounded bg-white shadow divide-y divide-slate-300">
				<div onClick={zoomIn} className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100">
					<GoZoomIn className="map-nav-button" />
				</div>
				<div onClick={zoomOut} className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100">
					<GoZoomOut className="map-nav-button" />
				</div>
				<div onClick={resetAll} className="text-center cursor-pointer h-10 w-10 hover:bg-slate-100">
					<GoScreenFull className="map-nav-button" />
				</div>
			</div>

			{/* map */}
			<PanViewer
			// ! WTF: adding flex in classname gives error
				className="w-full justify-center items-center"
				style={{
					display: "flex",
				}}
				zoom={zoom}
				setZoom={setZoom}
				pandx={dx}
				pandy={dy}
				onPan={onPan}
				key={dx}
			>
				<img className="w-full relative" src={image} alt={alt} ref={ref} />
				<GoHome className="absolute h-6 w-6 top-36 left-5 text-success cursor-pointer" onClick={()=>alert('click bhayo hai')} />
				<div className="absolute h-5 w-5 bg-red-300 top-3 left-3">I</div>
			</PanViewer>
		</div>
	);
};

export default Map;
