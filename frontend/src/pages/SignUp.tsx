import React from "react";
import AccountForm from "../components/forms/signup/AccountForm";
import PasswordForm from "../components/forms/signup/PasswordForm";
import TermsForm from "../components/forms/signup/TermsForm";

const Signup: React.FC = () => {
	return (
		<>
			{/* spacer for header */}
			<div
				data-theme="halloween"
				className="carousel carousel-vertical h-screen w-screen image-full bg-cover"
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
