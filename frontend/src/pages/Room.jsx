import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Room = () => {
	// function MyComponent() {
	// 	const map = useMap();
	// 	console.log("map center:", map.getCenter());
	// 	return null;
	// }
	return (
		<div >
			<MapContainer center={[27.717387, 85.325933]} zoom={13} scrollWheelZoom={true} className="w-[600px] h-[600px] border-2 border-red-600">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					url="../../public/map/new-leaf.jpg"
					noWrap={true}
				/>
				<Marker position={[27.717387, 85.325933]}>
					<Popup>
						Arbyte SOlution. <br /> Office.
					</Popup>
				</Marker>
				{/* <MyComponent /> */}
			</MapContainer>
		</div>
	);
};

export default Room;
