import React from 'react'
import Map from '../components/map/Map'
import RoomCarousel from '../components/room/RoomCarousel'


const Room:React.FC = () => {
	return (
		<>
			<div className="md:container flex flex-col md:flex-row">
				<div className="map-container w-full md:w-1/2 border border-blue-500 overflow-clip">
					<Map image={'../../public/map/new-leaf.jpg'} alt={'resort map'} />
				</div>
				<div className="room-details w-full md:w-1/2 border border-red-500">
					<div className="flex flex-col">
						<h2>Room details</h2>
						<RoomCarousel />
					</div>
				</div>
			</div>
		</>
	)
}

export default Room