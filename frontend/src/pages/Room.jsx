import React from "react";
import { MapContainer, Marker, Popup, Rectangle, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Room = () => {
	// function MyComponent() {
	// 	const map = useMap();
	// 	console.log("map center:", map.getCenter());
	// 	return null;
	// }

	const arbyte = [27.717387, 85.325933];

	const bound = [
		[27.717287, 85.325833],
		[27.717487, 85.326033]
	];
	return (
		<div >
			<MapContainer
				center={arbyte} zoom={14} bounds={bound} scrollWheelZoom={true} className="w-[600px] h-[600px] border-2 border-red-600">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					// url="../../public/map/map.osm"
					// url="../../public/2-chairs-in-resort.jpg"
					// url="https://api.maptiler.com/tiles/cadastre/?key=CMUPZs4qPm8L6U38zJnK#1.4/42.03210/-3.32727"
					// url = "https://api.maptiler.com/tiles/cadastre/{z}/{x}/{y}.pbf?key=CMUPZs4qPm8L6U38zJnK"
					noWrap={true}
				/>
				<Marker position={arbyte}>
					<Popup>
						Arbyte SOlution. <br /> Office.
					</Popup>
				</Marker>
				<Rectangle bounds={bound} color="red" />
			</MapContainer>
			<iframe width="500" height="300" src="https://api.maptiler.com/tiles/cadastre/?key=CMUPZs4qPm8L6U38zJnK#6.3/47.39125/7.36378"></iframe>
		</div>
	);
};

export default Room;
