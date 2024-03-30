import React, { useEffect } from "react";
import AccountForm from "../components/forms/signup/AccountForm";
import PasswordForm from "../components/forms/signup/PasswordForm";
import TermsForm from "../components/forms/signup/TermsForm";

const Signup: React.FC = () => {
	useEffect(() => {
		const handleWheel = (e: Event) => {
			console.log("wheel not allowed");
			e.preventDefault();
		};
		const handleTouchMove = (e: Event) => {
			console.log("touch move not allowed");
			e.preventDefault();
		};

		// Explicitly set passive to false to avoid the warning
		window.addEventListener("wheel", handleWheel, { passive: false });
		window.addEventListener("touchmove", handleTouchMove, { passive: false });

		// removes event listener when this component is not being rendered
		return () => {
			window.removeEventListener("wheel", handleWheel);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, []);

	return (
		<>
			<div
				data-theme="halloween"
				className="carousel carousel-vertical h-screen w-screen image-full bg-cover z-[1]"
				style={{
					backgroundImage: "url('../../public/campfire.jpg')",
					backgroundPosition: "center",
				}}
			>
				<div
					id="item1"
					className="carousel-item h-full px-4 flex justify-center items-center flex-col md:container bg-transparent"
				>
					<AccountForm />
				</div>
				<div
					id="item2"
					className="carousel-item h-full px-4 flex justify-center items-center flex-col  md:container bg-transparent"
				>
					<PasswordForm />
				</div>
				<div
					id="item3"
					className="carousel-item h-full px-4 flex justify-center items-center flex-col  md:container bg-transparent"
				>
					<TermsForm />
				</div>
			</div>
		</>
	);
};

export default Signup;
