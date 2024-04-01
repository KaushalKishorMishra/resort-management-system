import React from "react";
import ResetPasswordForm from "../components/forms/reset-password/ResetPasswordForm";

const ResetPassword: React.FC = () => {
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
					<ResetPasswordForm />
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
