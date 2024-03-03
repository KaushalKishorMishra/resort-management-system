import React from "react";
import SignupForm from "../components/forms/signup/SignupForm";

const Signup: React.FC = () => {
	return (
		<>
			<div
				className="carousel carousel-vertical h-screen w-screen image-full bg-cover"
				style={{
					backgroundImage: "url('../../public/hero-flower.jpg')",
					backgroundPosition: "center",
				}}
			>
				<div
					id="item1"
					className="carousel-item h-full w-screen flex justify-center items-center flex-col md:container bg-transparent"
				>
					<SignupForm />
				</div>
				<div
					id="item2"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-transparent"
				>
					<SignupForm />
				</div>
				<div
					id="item3"
					className="carousel-item h-full w-screen flex justify-center items-center gap-10 flex-col  md:container bg-transparent"
				>
					<SignupForm />
				</div>
			</div>
		</>
	);
};

export default Signup;
