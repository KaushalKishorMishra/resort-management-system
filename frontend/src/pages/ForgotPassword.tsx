import React from "react";
import EmailForm from "../components/forms/reset-password/EmailForm";

const ForgotPassword: React.FC = () => {
	return (
		<>
			<div
				data-theme="halloween"
				className="h-screen w-screen image-full bg-cover"
				style={{
					backgroundImage: "url('../../public/campfire.jpg')",
					backgroundPosition: "center",
				}}
			>
				<div className="h-full px-4 flex justify-center items-center flex-col md:container bg-transparent">
					<EmailForm />
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
