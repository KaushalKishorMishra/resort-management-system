import React, { useState } from "react";
import ResetPasswordForm from "../components/forms/reset-password/ResetPasswordForm";
import EmailForm from "../components/forms/reset-password/EmailForm";

const ResetPassword: React.FC = () => {
	const [formState, setFormState] = useState(1);
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
					{formState === 1 && <EmailForm setFormState={setFormState} />}
					{formState === 2 && <ResetPasswordForm setFormState={setFormState} />}
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
