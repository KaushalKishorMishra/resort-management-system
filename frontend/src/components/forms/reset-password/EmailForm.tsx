import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthApi } from "../../../apis/authApi";
import { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";

type EmailFormProps = {
	setFormState: React.Dispatch<React.SetStateAction<number>>;
};

const EmailForm: React.FC<EmailFormProps> = ({ setFormState }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		// reset,
		// getValues,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		const forgotPasswordData = { email: data.email as string };
		const response: AxiosResponse = await AuthApi.forgotPassword(forgotPasswordData);
		console.log(response.data.message);
		if (response.status >= 200 && response.status < 300) {
			toast.success("Password reset token has been sent to you email.", {
				position: "top-right",
				theme: "dark",
			});
			sessionStorage.setItem("resetEmail", forgotPasswordData.email);
			setFormState(2);
		} else {
			toast.error(response.data.message, {
				position: "top-right",
				theme: "dark",
			});
		}
	};

	return (
		<>
			<ToastContainer />
			<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
				<h1 className="mb-2 text-4xl font-bold text-white text-center">Forgot your password</h1>
				<p className="mb-3 font-semibold text-lg text-white text-center">
					Enter your email to find your account.
				</p>
				<div className="flex flex-col">
					<label htmlFor="email" className="font-semibold text-lg">
						Email*
					</label>
					<input
						{...register("email", {
							required: "Email is required",
						})}
						className="signup-input"
						type="email"
						placeholder="Email"
					/>
					{errors.email && (
						<span className="text-scarlet">
							<>{errors.email.message}</>
						</span>
					)}
				</div>
				<button
					type="submit"
					className="btn btn-primary w-fit rounded-full self-end px-6 text-lg"
					disabled={isSubmitting}
				>
					{isSubmitting ? "Finding..." : "Find"}
				</button>
				<Link to="/login" className="text-gray-100 text-center text-lg w-full max-w-lg btn btn-ghost">
					Remember your password? <span className="text-primary font-bold">Log In</span>
				</Link>
			</form>
		</>
	);
};

export default EmailForm;
