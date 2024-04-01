import React from "react";
import ForgotPasswordForm from "../components/forms/forgot-password/ForgotPassworForm";

const ForgotPassword: React.FC = () => {
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
				<div className="h-full px-4 flex justify-center items-center flex-col md:container bg-transparent">
					<ForgotPasswordForm />
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
