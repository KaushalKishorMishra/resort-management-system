import React from "react";
import LoginForm from "../components/forms/login/LoginForm";

const Login: React.FC = () => {
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
				<div
					className="h-full px-4 flex justify-center items-center flex-col md:container bg-transparent"
				>
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default Login;
