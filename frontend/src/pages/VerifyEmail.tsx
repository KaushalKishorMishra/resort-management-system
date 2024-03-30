import React from "react";
import VerifyEmailForm from "../components/forms/verify-email/VerifyEmailForm";

const VerifyEmail: React.FC = () => {
	return (
		<>
			<div
				data-theme="halloween"
				className="carousel carousel-vertical h-screen w-screen image-full bg-cover"
				style={{
					backgroundImage: "url('../../public/campfire.jpg')",
					backgroundPosition: "center",
				}}
			>
				<div
					className="h-full px-4 flex justify-center items-center flex-col md:container bg-transparent"
				>
					<VerifyEmailForm />
				</div>
			</div>
		</>
	);
};

export default VerifyEmail;
