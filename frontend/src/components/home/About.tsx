import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
	return (
		<div className="map-preview bg-custom-bg-dark py-10">
			<div className="container flex justify-between items-center flex-col md:flex-row gap-8 md:gap-20">
				<div className="image-carousel w-full md:w-3/5">
					<img src="../../../public/resort-pool.jpg" alt="" className="w-full image-full" />
				</div>
				<div className="room-data w-full md:w-2/5">
					<p className="text-custom-accent uppercase font-bold font-ostwald text-lg">ABOUT US</p>
					<h3 className="text-4xl uppercase font-kalam text-white font-extrabold my-5">
						WE ARE PASSIONATE ABOUT PROVIDING EXCEPTIONAL BOOKING EXPERIENCE
					</h3>
					<p className="text-white my-3">
						We strive to create a memorable and enjoyable experience for all our guests. Our dedicated team
						is committed to providing exceptional service and ensuring your stay is comfortable and
						stress-free.
					</p>
					<Link to="/contact" className="btn-square-outline-dark">
						CONTACT <FaArrowRight className="text-custom-accent" />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default About;
