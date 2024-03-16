import React from "react";

const RoomCarousel: React.FC = () => {
	return (
		<>
			<div className="carousel w-full">
				<div id="room-image1" className="carousel-item w-full relative">
					<img
						src="https://daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg"
						className="w-full"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a href="#room-image4" className="btn btn-circle text-white">
							❮
						</a>
						<a href="#room-image2" className="btn btn-circle text-white" onClick={e=>e.preventDefault}>
							❯
						</a>
					</div>
				</div>
				<div id="room-image2" className="carousel-item w-full relative">
					<img
						src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
						className="w-full"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a href="#room-image1" className="btn btn-circle text-white">
							❮
						</a>
						<a href="#room-image3" className="btn btn-circle text-white">
							❯
						</a>
					</div>
				</div>
				<div id="room-image3" className="carousel-item w-full relative">
					<img
						src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
						className="w-full"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a href="#room-image2" className="btn btn-circle text-white">
							❮
						</a>
						<a href="#room-image4" className="btn btn-circle text-white">
							❯
						</a>
					</div>
				</div>
				<div id="room-image4" className="carousel-item w-full relative">
					<img
						src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
						className="w-full"
					/>
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a href="#room-image3" className="btn btn-circle text-white">
							❮
						</a>
						<a href="#room-image1" className="btn btn-circle text-white">
							❯
						</a>
					</div>
				</div>
			</div>
			<div className="flex justify-center w-full py-2 gap-2">
				<a href="#item1" className="btn btn-xs">
					1
				</a>
				<a href="#item2" className="btn btn-xs">
					2
				</a>
				<a href="#item3" className="btn btn-xs">
					3
				</a>
				<a href="#item4" className="btn btn-xs">
					4
				</a>
			</div>
		</>
	);
};

export default RoomCarousel;
