import React from "react";
import LoginForm from "../components/forms/LoginForm";

const Login: React.FC = () => {
	return (
		<>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: "url('../../public/resort-pool.jpg')",
				}}
			>
				<div className="hero-overlay bg-opacity-30"></div>
				<div className="text-center w-full max-w-lg p-10">
					<LoginForm />
				</div>
			</div>
		</>
	);
};

export default Login;
