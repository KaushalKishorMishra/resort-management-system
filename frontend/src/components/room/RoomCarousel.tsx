import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const RoomCarousel: React.FC = () => {
	return (
		<>
			<Swiper
				pagination={{
					type: "bullets",
					clickable: true,
				}}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				navigation={true}
				modules={[Pagination, Navigation, Autoplay]}
				className="mySwiper"
			>
				<SwiperSlide>
					<img src="../../../public/resort-pool.jpg" alt="" className="image-full" />
				</SwiperSlide>
				<SwiperSlide>
					<img src="../../../public/resort-pool.jpg" alt="" className="image-full" />
				</SwiperSlide>
				<SwiperSlide>
					<img src="../../../public/resort-pool.jpg" alt="" className="image-full" />
				</SwiperSlide>
			</Swiper>
		</>
	);
};
export default RoomCarousel;
